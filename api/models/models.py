import uuid
from django.db import models
from django.contrib.auth.models import User

# ==========================================
# VLAS 3.0 CORE MODELS
# ==========================================

class CommunicationSession(models.Model):
    """
    Representa un evento operativo único (ej: una guardia, una sesión de entrenamiento).
    Es la entidad principal que se muestra en el Dashboard.
    Sustituye al antiguo 'TranscriptionGroup'.
    """
    STATUS_CHOICES = [
        ('pending', 'Pending'),        # Subido, esperando proceso
        ('processing', 'Processing'),  # Diarizando/Transcribiendo
        ('ready', 'Ready for Review'), # Transcrito, espera revisión humana
        ('validated', 'Validated'),    # Validado por Safety (Auditoría cerrada)
        ('error', 'Error'),            # Fallo técnico
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    
    # Ownership & Context
    atco = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sessions', help_text="El controlador propietario de la sesión")
    airport_code = models.CharField(max_length=10, help_text="Código ICAO (ej: LECU, LEMD)")
    sector_id = models.CharField(max_length=50, blank=True, help_text="Identificador opcional del sector (ej: Norte, Aproximación)")
    
    # Metadata
    session_date = models.DateTimeField(help_text="Fecha/Hora real del evento operativo")
    created_at = models.DateTimeField(auto_now_add=True, help_text="Fecha de subida al sistema")
    
    # Status & Audit
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    
    # Safety Scores (Calculados tras validación)
    safety_score = models.IntegerField(null=True, blank=True, help_text="Puntuación global 0-100")
    
    # Validation Data
    validation_report = models.JSONField(null=True, blank=True, help_text="Informe JSON completo de errores detectados")
    is_flagged = models.BooleanField(default=False, help_text="Si ha sido marcado para revisión por un supervisor")

    class Meta:
        ordering = ['-session_date']

    def __str__(self):
        return f"{self.airport_code} - {self.session_date.strftime('%Y-%m-%d %H:%M')} ({self.atco.username})"


class AudioFile(models.Model):
    """
    Archivos de audio "crudos" que componen la sesión.
    Sustituye al antiguo 'AudioTranscription'.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    session = models.ForeignKey(CommunicationSession, related_name='audios', on_delete=models.CASCADE)
    
    file = models.FileField(upload_to='sessions/audio/')
    original_filename = models.CharField(max_length=255)
    duration_seconds = models.FloatField(null=True, blank=True)
    
    # Technical status of THIS specific file (processed or not)
    is_processed = models.BooleanField(default=False)
    processing_error = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.original_filename


class SpeechSegment(models.Model):
    """
    Unidad atómica de comunicación. Una frase dicha por alguien.
    """
    SPEAKER_ROLES = [
        ('ATCO', 'Controller'),
        ('PILOT', 'Pilot'),
        ('OTHER', 'Other/Noise'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    
    # Vinculación directa al AUDIO (físico)
    audio_file = models.ForeignKey(AudioFile, related_name='segments', on_delete=models.CASCADE)
    
    # Tiempos
    start_time = models.FloatField()
    end_time = models.FloatField()
    
    # Contenido
    speaker_role = models.CharField(max_length=10, choices=SPEAKER_ROLES, default='OTHER')
    text_content = models.TextField(help_text="Transcripción final editada")
    original_ai_text = models.TextField(help_text="Transcripción original de Whisper (para deshacer cambios)", null=True, blank=True)
    
    # Auditoría del Segmento
    has_error = models.BooleanField(default=False)
    error_details = models.JSONField(null=True, blank=True, help_text="Detalle del error normativo en este segmento")

    # Segment audio snippet (opcional, para performance)
    segment_file_path = models.CharField(max_length=500, null=True, blank=True, help_text="Ruta al recorte de audio si se genera")

    class Meta:
        ordering = ['start_time']

# ==========================================
# AUXILIARY MODELS
# ==========================================

class Airline(models.Model):
    name = models.CharField(max_length=100, unique=True)
    icao_code = models.CharField(max_length=3, null=True, blank=True) # e.g. RYR
    iata_code = models.CharField(max_length=2, null=True, blank=True) # e.g. FR
    callsign = models.CharField(max_length=50, null=True, blank=True) # e.g. RYANAIR

    def __str__(self):
        return self.name

class TranscriptionCorrection(models.Model):
    """
    Diccionario de correcciones automáticas (Whisper hallucination fix).
    """
    incorrect_text = models.CharField(max_length=100, unique=True)
    correct_text = models.CharField(max_length=100)
    category = models.CharField(max_length=50, choices=[
        ('airline', 'Aerolínea'),
        ('number', 'Número'),
        ('terminology', 'Terminología'),
        ('general', 'General')
    ], default='general')

    def __str__(self):
        return f"{self.incorrect_text} -> {self.correct_text}"
