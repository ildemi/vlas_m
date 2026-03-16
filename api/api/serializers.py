from django.conf import settings
from rest_framework import serializers
from api.models.models import CommunicationSession, AudioFile, SpeechSegment

# ==========================================
# SEGMENT & AUDIO SERIALIZERS
# ==========================================

class SpeechSegmentSerializer(serializers.ModelSerializer):
    segment_url = serializers.SerializerMethodField()
    
    class Meta:
        model = SpeechSegment
        fields = [
            'id', 'speaker_role', 'text_content', 'original_ai_text', 
            'start_time', 'end_time', 'has_error', 'error_details', 
            'segment_url'
        ]

    def get_segment_url(self, obj):
        # TODO: Implementar lógica robusta de URL para archivos segmentados si existen
        # Por ahora devolvemos la ruta si está guardada
        if obj.segment_file_path:
             return f"{settings.SITE_URL}{settings.MEDIA_URL}{obj.segment_file_path}"
        return None

class AudioFileSerializer(serializers.ModelSerializer):
    file_url = serializers.SerializerMethodField()
    segments = SpeechSegmentSerializer(many=True, read_only=True)

    class Meta:
        model = AudioFile
        fields = [
            'id', 'original_filename', 'file_url', 'duration_seconds', 
            'is_processed', 'processing_error', 'segments'
        ]

    def get_file_url(self, obj):
        if obj.file:
            return f"{settings.SITE_URL}{obj.file.url}"
        return None

# ==========================================
# SESSION SERIALIZERS
# ==========================================

class DashboardSessionSerializer(serializers.ModelSerializer):
    """
    Serializador ligero para la tabla del Dashboard (React).
    Solo envía los metadatos necesarios para el listado.
    """
    atco_username = serializers.CharField(source='atco.username', read_only=True)
    atco_id = serializers.IntegerField(source='atco.id', read_only=True)
    # Formateamos la fecha para que sea amigable en el frontend o se puede enviar ISO
    formatted_date = serializers.DateTimeField(source='session_date', format="%Y-%m-%d %H:%M", read_only=True)

    class Meta:
        model = CommunicationSession
        fields = [
            'id', 'status', 'airport_code', 'sector_id',
            'session_date', 'formatted_date', 'atco_username', 'atco_id',
            'safety_score', 'is_flagged'
        ]

class CommunicationSessionDetailSerializer(serializers.ModelSerializer):
    """
    Serializador completo para la vista de detalle (Workbench).
    Incluye los audios y sus segmentos.
    """
    audios = AudioFileSerializer(many=True, read_only=True)
    atco_username = serializers.CharField(source='atco.username', read_only=True)

    class Meta:
        model = CommunicationSession
        fields = [
            'id', 'status', 'airport_code', 'sector_id',
            'session_date', 'created_at', 'atco_username', 
            'safety_score', 'validation_report', 'is_flagged',
            'audios'
        ]
