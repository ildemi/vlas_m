from faster_whisper import WhisperModel
import os
import torch
from django.conf import settings
from .normalize import filterAndNormalize
import logging

logger = logging.getLogger(__name__)

# Constants
ALLOWED_EXTENSIONS = [
    '.wav',
    '.mp3',
    '.mp4',
    '.m4a',
]

class TranscriptionAgent:
    """
    Agente optimizado de transcripción usando Faster-Whisper (CTranslate2).
    Permite configuración dinámica vía variables de entorno.
    """

    def __init__(self, model_name: str = None):
        """
        Inicializa el modelo Faster-Whisper.

        Args:
            model_name (str): Nombre del modelo Whisper a usar.
                              Si es None, lo toma de settings.WHISPER_MODEL_NAME
                              o por defecto 'jlvdoorn/whisper-large-v3-atco2-asr'
        """
        # Cargar configuración desde settings o usar defaults
        self.model_size = model_name or getattr(settings, 'WHISPER_MODEL_NAME', 'jlvdoorn/whisper-large-v3-atco2-asr')
        self.device = getattr(settings, 'WHISPER_DEVICE', 'cuda' if torch.cuda.is_available() else 'cpu')
        
        # Compute type inteligente: float16 solo si tenemos GPU, si no int8
        default_compute = 'float16' if self.device == 'cuda' else 'int8'
        self.compute_type = getattr(settings, 'WHISPER_COMPUTE_TYPE', default_compute)

        logger.info(f'Iniciando TranscriptionAgent...')
        logger.info(f'Model: {self.model_size}')
        logger.info(f'Device: {self.device}')
        logger.info(f'Compute Type: {self.compute_type}')

        try:
            # Cargar el modelo (se descarga automáticamente la primera vez a huggingface cache)
            self.model = WhisperModel(
                self.model_size, 
                device=self.device, 
                compute_type=self.compute_type
            )
            logger.info('Faster-Whisper model loaded successfully.')
        except Exception as e:
            logger.critical(f'Failed to load Faster-Whisper model: {e}')
            raise e

    def invoke(self, audio_path: str, normalize: bool = True, language: str = None):
        """
        Transcribe un archivo de audio.

        Args:
            audio_path (str): Ruta absoluta al archivo de audio.
            normalize (bool): Si True, aplica normalización post-transcripción (limpieza de texto).
            language (str, optional): 'es', 'en' o None para auto-detección.

        Returns:
            str: Texto transcrito.
        """
        if not os.path.exists(audio_path):
            logger.error(f'Error: Audio path does not exist: {audio_path}')
            return ''
        
        ext = os.path.splitext(audio_path)[1].lower()
        if ext not in ALLOWED_EXTENSIONS:
            logger.error(f'Error: Invalid extension {ext}')
            return ''

        try:
            logger.info(f'Transcribing file: {audio_path}')
            # Transcribir
            # beam_size=5 es el estándar para buena calidad en Whisper
            segments, info = self.model.transcribe(
                audio_path, 
                beam_size=5, 
                language=language,
                vad_filter=True, # Voice Activity Detection para saltar silencios
                vad_parameters=dict(min_silence_duration_ms=500)
            )

            logger.debug(f'Detected language: {info.language} with probability {info.language_probability}')

            # Faster-Whisper devuelve un generador, iteramos para obtener el texto
            full_text = []
            for segment in segments:
                full_text.append(segment.text)
            
            # Unir todo el texto
            transcription = ' '.join(full_text).strip()

            # Normalización opcional (limpieza de artefactos)
            if normalize:
                transcription = filterAndNormalize(transcription)

            logger.info('Transcription completed.')
            return transcription

        except Exception as e:
            logger.error(f'Error during transcription: {e}')
            return ''

# Instancia global lazy
_transcriber_instance = None

def get_transcriber_instance():
    global _transcriber_instance
    if _transcriber_instance is None:
        _transcriber_instance = TranscriptionAgent()
    return _transcriber_instance

# Compatibilidad con código existente que importa transcriber_instance
class LazyTranscriberProxy:
    def invoke(self, *args, **kwargs):
        return get_transcriber_instance().invoke(*args, **kwargs)

transcriber_instance = LazyTranscriberProxy()
