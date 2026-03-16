import logging
import uuid
from pathlib import Path
from django.conf import settings
from django.utils import timezone
from django.shortcuts import get_object_or_404
from rest_framework import status, viewsets, permissions, filters
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.db.models import Q

# Nuevos Modelos y Serializers
from api.models.models import CommunicationSession, AudioFile, SpeechSegment
from .serializers import (
    DashboardSessionSerializer, 
    CommunicationSessionDetailSerializer, 
    AudioFileSerializer
)
# Tareas asíncronas (se actualizarán en el siguiente paso)
from .tasks import process_audio_file_task

logger = logging.getLogger(__name__)

# ==========================================
# AUTHENTICATION VIEWS (Legacy + JWT)
# ==========================================

@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    username = request.data.get('username', '').strip()
    password = request.data.get('password', '').strip()

    if not username or not password:
        return Response({'detail': 'Username and password are required'}, status=status.HTTP_400_BAD_REQUEST)

    user = authenticate(username=username, password=password)

    if user:
        user.last_login = timezone.now()
        user.save()
        refresh = RefreshToken.for_user(user)
        return Response({
            'access': str(refresh.access_token), 
            'refresh': str(refresh),
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'role': 'atco' # Placeholder, en el futuro vendrá del perfil
            }
        }, status=status.HTTP_200_OK)

    return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    try:
        data = request.data
        if User.objects.filter(username=data.get('username')).exists():
            return Response({'detail': 'Username already exists'}, status=400)
        
        user = User.objects.create_user(
            username=data['username'],
            email=data.get('email', ''),
            password=data['password']
        )
        return Response({'detail': 'User created'}, status=201)
    except Exception as e:
         return Response({'detail': str(e)}, status=400)

# ==========================================
# VLAS 3.0 SESSION VIEWS
# ==========================================

class SessionViewSet(viewsets.ModelViewSet):
    """
    CRUD principal para las sesiones. 
    - list: Devuelve formato ligero para la tabla (Dashboard).
    - retrieve: Devuelve formato detallado para el Workbench.
    - create: Sube audio y crea sesión.
    """
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        # ATCOs solo ven sus sesiones, Supervisores verían todo (logica futura)
        return CommunicationSession.objects.filter(atco=self.request.user)

    def get_serializer_class(self):
        if self.action == 'list':
            return DashboardSessionSerializer
        return CommunicationSessionDetailSerializer

    @action(detail=False, methods=['POST'], parser_classes=[])  # Parser se maneja manual o con MultiPartParser
    def upload(self, request):
        """
        Endpoint unificado para crear una sesión y subir audios.
        Payload esperado (Multipart):
        - airport_code
        - session_date
        - files[] (lista de archivos de audio)
        """
        try:
            airport_code = request.data.get('airport_code', 'UNKNOWN')
            session_date_str = request.data.get('session_date', timezone.now())
            
            # 1. Crear la Sesión
            session = CommunicationSession.objects.create(
                atco=request.user,
                airport_code=airport_code,
                session_date=session_date_str, # Django/DRF parseará esto automático si es ISO
                status='processing' # Pasa directo a procesar
            )

            # 2. Procesar Archivos
            files = request.FILES.getlist('files')
            if not files:
                # Si viene como 'file' singular
                files = request.FILES.getlist('file')

            created_audios = []
            for f in files:
                audio_instance = AudioFile.objects.create(
                    session=session,
                    file=f,
                    original_filename=f.name
                )
                created_audios.append(audio_instance)
                
                # 3. Lanzar Tarea Asíncrona (Celery)
                # NOTA: process_audio_file_task debe ser actualizada en tasks.py
                process_audio_file_task.delay(audio_instance.id)

            serializer = CommunicationSessionDetailSerializer(session)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        except Exception as e:
            logger.error(f"Error creating session: {e}")
            return Response({'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(detail=True, methods=['POST'])
    def validate(self, request, pk=None):
        """
        Trigger manual para lanzar la validación de Safety.
        """
        session = self.get_object()
        # TODO: Implementar llamada a celery validation_task
        session.status = 'validated' # Mock temporal
        session.safety_score = 95
        session.save()
        return Response({'detail': 'Validation started'}, status=200)

# ==========================================
# SEGMENT EDITING VIEWS
# ==========================================

class SegmentUpdateView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, pk):
        segment = get_object_or_404(SpeechSegment, pk=pk)
        # Check ownership
        if segment.audio_file.session.atco != request.user:
            return Response({'detail': 'Forbidden'}, status=403)
        
        # Update fields
        if 'text_content' in request.data:
            segment.text_content = request.data['text_content']
        if 'speaker_role' in request.data:
            segment.speaker_role = request.data['speaker_role']
            
        segment.save()
        return Response({'detail': 'Updated'}, status=200)
