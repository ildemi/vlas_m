import os
import logging
from pathlib import Path
from celery import shared_task
from django.db import transaction
from django.conf import settings
from django.utils import timezone

from api.models.models import AudioFile, SpeechSegment, CommunicationSession

# AI Components
from .transcriber.transcriber import transcriber_instance
from .diarizer import AudioDiarization
from .transcriber.semantic_sanitizer import get_sanitizer

logger = logging.getLogger(__name__)

@shared_task(bind=True)
def process_audio_file_task(self, audio_file_id):
    """
    Tarea Maestra que orquesta el pipeline completo para VLAS 3.0:
    1. Diarización (Pyannote) -> Separa hablantes y segmentos.
    2. Transcripción (Whisper) -> Audio a Texto.
    3. Sanitización (Gemini) -> Limpieza y Clasificación de Hablantes.
    4. Guardado en DB.
    """
    try:
        # Recuperar el AudioFile
        try:
            audio_file = AudioFile.objects.get(id=audio_file_id)
        except AudioFile.DoesNotExist:
            logger.error(f"AudioFile {audio_file_id} not found.")
            return

        # Actualizar estado de la Sesión a 'Processing' si no lo está
        session = audio_file.session
        if session.status != 'processing':
            session.status = 'processing'
            session.save()

        logger.info(f"Processing AudioFile {audio_file_id} for Session {session.id}")
        file_path = audio_file.file.path

        # ---------------------------------------------------------
        # PASO 1: DIARIZACIÓN
        # ---------------------------------------------------------
        logger.info(f"Starting Diarization for {file_path}")
        try: 
            diarizer = AudioDiarization()
            # invoke devuelve lista de dicts: {'path': '...', 'start_time': 0.0, 'end_time': 2.5, 'label': 'SPEAKER_00'}
            diarized_segments = diarizer.invoke(file_path)
        except Exception as e:
             logger.error(f"Diarization failed: {e}")
             raise e

        if not diarized_segments:
            logger.warning("No segments found in audio.")
            audio_file.is_processed = True
            audio_file.save()
            return

        # ---------------------------------------------------------
        # PASO 2: TRANSCRIPCIÓN Y SANITIZACIÓN (Loop)
        # ---------------------------------------------------------
        sanitizer = get_sanitizer()
        context_window = [] # Memoria temporal para Gemini

        for idx, seg_data in enumerate(diarized_segments, start=1):
            seg_abs_path = Path(seg_data['path'])
            start_time = seg_data['start_time']
            end_time = seg_data['end_time']
            
            # --- 2.1 Whisper ---
            raw_text = transcriber_instance.invoke(
                audio_path=str(seg_abs_path),
                normalize=True,
                airport_id=session.airport_code # Priming with airport code
            )

            # Noise Gate
            if not raw_text or len(raw_text.strip()) < 2:
                continue

            # --- 2.2 Semantic Sanitizer (Gemini) ---
            # Pasamos las últimas 3 frases como contexto
            sanitization_result = sanitizer.invoke(
                text=raw_text,
                context_window=context_window[-3:]
            )
            
            refined_text = sanitization_result.get('refined_text', raw_text)
            speaker_role = sanitization_result.get('speaker', 'OTHER').upper() # ATCO, PILOT, OTHER

            # Update context
            context_window.append(f"{speaker_role}: {refined_text}")

            # --- 2.3 Guardar SpeechSegment ---
            relative_path = seg_abs_path.relative_to(settings.MEDIA_ROOT) if seg_abs_path.is_absolute() else seg_abs_path

            # Mapeo de roles estandarizados
            db_role = 'OTHER'
            if 'ATCO' in speaker_role: db_role = 'ATCO'
            elif 'PILOT' in speaker_role: db_role = 'PILOT'

            SpeechSegment.objects.create(
                audio_file=audio_file,
                start_time=start_time,
                end_time=end_time,
                speaker_role=db_role,
                text_content=refined_text,
                original_ai_text=raw_text,
                segment_file_path=str(relative_path)
            )
            
        # ---------------------------------------------------------
        # FIN DEL PROCESO
        # ---------------------------------------------------------
        audio_file.is_processed = True
        audio_file.save()
        
        # Verificar si la sesión ha terminado (todos los audios procesados)
        all_audios = session.audios.all()
        if all(a.is_processed for a in all_audios):
            session.status = 'ready' # Lista para revisión humana
            session.save()

        logger.info(f"Finished processing AudioFile {audio_file_id}")

    except Exception as e:
        logger.error(f"Error processing audio task: {e}")
        try:
            audio = AudioFile.objects.get(id=audio_file_id)
            audio.processing_error = str(e)
            audio.save()
            audio.session.status = 'error'
            audio.session.save()
        except:
            pass
        raise e

@shared_task(bind=True)
def initialize_backend_models(self):
    """
    Tarea para inicializar modelos secuencialmente reportando progreso.
    """
    try:
        import time
        logger.info("Starting granular model initialization...")
        
        # 1. Whisper
        from .transcriber.transcriber import get_transcriber_instance, is_model_loaded
        
        if is_model_loaded():
             logger.info("Whisper already loaded. Skipping.")
             self.update_state(state='PROGRESS', meta={'message': 'Whisper ya está listo...'})
        else:
            logger.info("Updating state to PROGRESS: Whisper...")
            self.update_state(state='PROGRESS', meta={'message': 'Inicializando Whisper (Transcripción)...'})
            time.sleep(1)
            real_instance = get_transcriber_instance()
            _ = real_instance.model 
            logger.info("Whisper loaded.")

        # 2. Pyannote (Diarización)
        logger.info("Updating state to PROGRESS: Pyannote...")
        self.update_state(state='PROGRESS', meta={'message': 'Inicializando Pyannote (Identificación de Hablantes)...'})
        time.sleep(1)
        _ = AudioDiarization()
        logger.info("Pyannote loaded.")

        return {"status": "ready", "details": "Todos los motores inicializados."}

    except Exception as e:
        logger.error(f"Error initializing models: {e}")
        return {"status": "error", "details": str(e)}
