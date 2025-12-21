import re

"""
Reglas de normalización determinista (Capa 2).
Se aplican después de la transcripción de Whisper y antes del LLM.
Objetivo: Corregir errores fonéticos recurrentes y estandarizar formato.
"""

# Reglas Generales (Aplican siempre)
COMMON_RULES = [
    # Normalización básica de números hablados a dígitos (simplificado)
    (r'(?i)\buno\b', '1'),
    (r'(?i)\bdos\b', '2'),
    (r'(?i)\btres\b', '3'),
    (r'(?i)\bcuatro\b', '4'),
    (r'(?i)\bcinco\b', '5'),
    (r'(?i)\bseis\b', '6'),
    (r'(?i)\bsiete\b', '7'),
    (r'(?i)\bocho\b', '8'),
    (r'(?i)\bnueve\b', '9'),
    (r'(?i)\bcero\b', '0'),
    (r'(?i)\bmil\b', '1000'),
    # English Numbers (Safety net for Whisper model bias)
    (r'(?i)\bone\b', '1'),
    (r'(?i)\btwo\b', '2'),
    (r'(?i)\bthree\b', '3'),
    (r'(?i)\bfour\b', '4'),
    (r'(?i)\bfive\b', '5'),
    (r'(?i)\bsix\b', '6'),
    (r'(?i)\bseven\b', '7'),
    (r'(?i)\beight\b', '8'),
    (r'(?i)\bnine\b', '9'),
    (r'(?i)\bzero\b', '0'),
    
    # QNH y Frecuencias (unir dígitos separados por espacios ej: "1 0 1 9")
    (r'\b(\d)\s+(\d)\s+(\d)\s+(\d)\b', r'\1\2\3\4'),  # 4 dígitos (QNH 1019)
    (r'\b(\d)\s+(\d)\s+(\d)\b', r'\1\2\3'),          # 3 dígitos (Rumbo 200)
    
    # Estandarización ICAO (errores comunes)
    (r'(?i)\b(ray|rey|array)\b', 'X-Ray'),
    (r'(?i)\b(yuli|julia)\b', 'Juliett'),
    (r'(?i)\b(v[íi]ctoria|victor)\b', 'Victor'), # Asegurar mayúscula
]

# Reglas Específicas por Aeropuerto
AIRPORT_RULES = {
    "LECU": [
        # --- CORRECCIONES INGLÉS/ESPAÑOL WHISPER HALLUCINATIONS ---
        (r'(?i)\b(tower)\b', 'Torre'),
        
        # --- ESCUELAS / CALLSIGNS ---
        # Aerotec
        (r'(?i)\b(airotek|air t nostru|air t|aero tec|airotec)\b', 'Aerotec'),
        
        # European Flyers
        (r'(?i)\b(european\s?flyers?|europea|european\s?flight)\b', 'European'),
        
        # Quality Fly
        (r'(?i)\b(qualified|qualify|eighty)\b', 'Quality Fly'),
        (r'(?i)\b(quality)\s+(?!fly)\b', 'Quality Fly '), # Si dice "Quality" a secas, añadir "Fly" (cuidado con duplicar)
        
        # --- MATRÍCULAS ---
        # "Eco Charly" -> EC-
        (r'(?i)\b(escotia\s?libra|eco\s?charly|echocha|ecotia|ecocha|eco\s?charli)\b', 'EC-'),
        (r'(?i)\b(ec-)\s?([a-z])', r'\1\2'), # Unir EC- con la siguiente letra
        
        # --- TERMINOLOGÍA / LUGARES ---
        (r'(?i)\b(viento en cual|venta en cola|viento en coala)\b', 'viento en cola'),
        (r'(?i)\b(compañero general|compañero)\b', 'compañía'),
        (r'(?i)\b(rueda|roto)\s?(al)?\s?punto\s?(de)?\s?espera\b', 'rodando punto de espera'),
        (r'(?i)\b(valladol[íi])\b', 'Valladolid'),
        
        # Pistas LECU
        (r'(?i)\bpista\s?2\s?7\b', 'pista 27'),
        (r'(?i)\bpista\s?0\s?9\b', 'pista 09'),
        (r'(?i)\bpista\s?nueve\b', 'pista 09'),

        # Fraseología común
        (r'(?i)\b(amandando)\b', 'abandonando'),
        (r'(?i)\b(on fire)\b', 'One Five'), # Corrección específica de número
        
        # Torre
        (r'(?i)\b(tarra|tierra|tower)\s?4\s?vientos\b', 'Torre Cuatro Vientos'),
        (r'(?i)\b(los vientres|los vientos)\b', 'Cuatro Vientos'),
        (r'(?i)\b4\s?vientos\b', 'Cuatro Vientos'),
    ],
    
    "GCFV": [
        # Fuerteventura placeholder
        (r'(?i)\b(canary\s?fly)\b', 'Canaryfly'),
    ]
}

def apply_normalization_rules(text: str, airport_code: str = None) -> str:
    """Aplica reglas regex secuencialmente al texto."""
    if not text:
        return ""
        
    # 1. Aplicar reglas generales
    for pattern, replacement in COMMON_RULES:
        text = re.sub(pattern, replacement, text)
        
    # 2. Aplicar reglas específicas del aeropuerto si existe
    if airport_code:
        code = airport_code.upper().strip()
        rules = AIRPORT_RULES.get(code, [])
        for pattern, replacement in rules:
            text = re.sub(pattern, replacement, text)
            
    # Limpieza final de espacios dobles
    text = re.sub(r'\s+', ' ', text).strip()
    
    return text
