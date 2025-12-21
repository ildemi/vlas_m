
import logging
import json
import os
import google.generativeai as genai
from django.conf import settings

logger = logging.getLogger(__name__)

class SemanticSanitizer:
    def __init__(self, model_name="gemini-1.5-flash"):
        self.model_name = model_name
        self.api_key = os.getenv('GEMINI_API_KEY')
        self.client_ready = False
        
        if self.api_key:
            try:
                genai.configure(api_key=self.api_key)
                self.model = genai.GenerativeModel(
                    self.model_name,
                    generation_config={"response_mime_type": "application/json"}
                )
                self.client_ready = True
                logger.info(f"Gemini Sanitizer initialized with model: {self.model_name}")
            except Exception as e:
                logger.error(f"Failed to initialize Gemini client: {e}")
        else:
            logger.warning("GEMINI_API_KEY not found in environment. Sanitizer will be disabled.")

    def invoke(self, text: str, context_window: list = None) -> dict:
        """
        Refina la transcripción y clasifica el hablante usando Google Gemini.
        Returns:
            dict: {"refined_text": str, "speaker": str}
        """
        if not text or not self.client_ready:
            return {"refined_text": text, "speaker": "OTHER"}

        # Construir contexto simple
        ctx_str = "No hay contexto previo."
        if context_window and len(context_window) > 0:
            ctx_str = "Contexto previo (conversación anterior):\n" + "\n".join(context_window[-3:]) # Últimas 3 frases

        prompt = f"""
        Eres un sistema experto en clasificación de diálogos ATC (Air Traffic Control) para Madrid Cuatro Vientos (LECU).
        
        TU INPUT: "{text}"
        {ctx_str}
        
        OBJETIVOS:
        1. REFINED_TEXT: Limpia SOLO errores obvios de transcripción (ej: 'ok recibido' -> 'Recibido', mayúsculas iniciales). NO cambies la fraseología técnica aunque sea incorrecta.
        2. SPEAKER: Clasifica RIGUROSAMENTE quién habla ('ATCO' o 'PILOT').
        
        GUÍA DE CLASIFICACIÓN (LECU):
        - ATCO (Controlador):
            * Empieza por el Callsign del avión: "Aerotec uno, autorizado...", "EC-H, notifique...".
            * Da órdenes: "Autorizado", "Notifique", "Ruede", "Mantenga", "Viento", "Pista libre", "Motor y al aire".
            * Dice "Adelante" para dar paso.
            
        - PILOT (Piloto):
            * Empieza llamando a la dependencia: "Torre, Aerotec uno...", "Cuatro Vientos, buenas...".
            * Colaciona (repite instrucciones): "Autorizado despegue...", "Rodando al punto...".
            * Informa posición: "Viento en cola", "Final pista 27".
            * Dice "Recibido", "Entendido".
           
        Responde SIEMPRE con este JSON válido (sin markdown):
        {{
            "refined_text": "...",
            "speaker": "ATCO" | "PILOT" | "OTHER"
        }}
        """

        try:
            response = self.model.generate_content(prompt)
            content = response.text
            
            # Logger para depuración
            logger.info(f"Gemini Response for '{text[:20]}...': {content}")
            
            # Limpieza robusta de Markdown json fences
            if "```json" in content:
                content = content.replace("```json", "").replace("```", "")
            elif "```" in content:
                content = content.replace("```", "")
            
            data = json.loads(content.strip())
            
            refined = data.get('refined_text', text)
            speaker = data.get('speaker', 'OTHER').upper()
            
            if speaker not in ['ATCO', 'PILOT', 'OTHER']:
                speaker = 'OTHER'
                
            return {"refined_text": refined, "speaker": speaker}

        except Exception as e:
            logger.error(f"Error in Semantic Sanitizer Gemini call: {e}")
            return {"refined_text": text, "speaker": "OTHER"}

# Instancia global lazy-loaded
_sanitizer_instance = None
def get_sanitizer():
    global _sanitizer_instance
    if _sanitizer_instance is None:
        _sanitizer_instance = SemanticSanitizer()
    return _sanitizer_instance
