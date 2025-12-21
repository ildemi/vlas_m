
"""
Base de conocimiento de Prompts Específicos por Aeropuerto para VLAS.
Este archivo actúa como la 'Capa 1' de contexto para Whisper.
"""

# Prompt genérico por defecto (Fallback)
DEFAULT_PROMPT = (
    "ATC Communications. Español/English mix. "
    "ICAO: Alfa Bravo Charlie Delta Echo Foxtrot Golf Hotel India Juliett Kilo Lima Mike November Oscar Papa Quebec Romeo Sierra Tango Uniform Victor Whiskey X-ray Yankee Zulu. "
    "Numbers: Uno Dos Tres Cuatro Cinco Seis Siete Ocho Nueve Diez Mil. "
    "Terms: Rodaje Pista Viento Nudos Grados QNH Autorizado Despegue Aterrizaje Frustrada Notifique Transpondedor Nivel Vuelo Ruta Directo. "
    "Callsigns: Iberia Vueling AirEuropa Ryanair Enaire Cessna Piper Swiftair Binter AirNostrum."
)

AIRPORT_PROMPTS = {
    "DEFAULT": DEFAULT_PROMPT,
    
    # Cuatro Vientos (Madrid) - Foco: Escuelas de pilotos, VFR
    "LECU": (
        "Comunicaciones ATC Madrid Cuatro Vientos LECU. Idioma principalmente Español, pero usando Inglés para números y letras ICAO. "
        "Ejemplo: 'Aerotec uno notifique viento en cola, QNH One Zero One Nine'. "
        "Escuelas: Aerotec, European Flyers, Quality Fly. "
        "Callsigns: Aerotec, European, Quality, Cisne. "
        "Matrículas: EC- (Eco Charly). "
        "Terminología: Compañía, Viento en cola, Rodando punto espera, Autorizado tomar, Torre, Pista 27, Pista 09. "
        "ICAO: Alfa Bravo Charlie Delta Echo Foxtrot Golf Hotel India Juliett Kilo Lima Mike November Oscar Papa Quebec Romeo Sierra Tango Uniform Victor Whiskey X-ray Yankee Zulu."
    ),
    
    # Fuerteventura - Foco: Turismo, Control de Aeródromo, Inglés/Español
    "GCFV": (
        "ATC Communications Fuerteventura GCFV. "
        "Airlines: Ryanair, Jet2, TUI, Binter, Canaryfly, Condor, Edelweiss, Transavia. "
        "Pistas: 01, 19. "
        "Puntos: Risco, Pinar, Betan, Gando. "
        "Terminología: Aproximación visual, Viento cruzado, Backtrack, Bloqueo. "
        "Callsigns: Binter, Canar, Channex, Tom, Condor. "
    )
}

def get_prompt_for_airport(airport_code: str = None) -> str:
    """Retorna el prompt específico o el default."""
    if not airport_code:
        return AIRPORT_PROMPTS["DEFAULT"]
    
    code = airport_code.upper().strip()
    return AIRPORT_PROMPTS.get(code, AIRPORT_PROMPTS["DEFAULT"])
