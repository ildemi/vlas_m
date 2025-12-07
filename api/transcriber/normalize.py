import re
from .constants import NATO_ALPHABET
# Evitamos importar modelos a nivel de módulo para prevenir AppRegistryNotReady
# from api.models.models import Airline, TranscriptionCorrection 

# normalizer = EnglishTextNormalizer() # Removed as we are not using openai-whisper

# Palabras especiales que siempre deben ir en mayúsculas
SPECIAL_WORDS = ['qnh', 'ils', 'vor', 'ndb', 'dme', 'gnss', 'rnav']

def get_normalization_data():
    """
    Recupera los datos de normalización de la base de datos o caché.
    Devuelve diccionarios optimizados para búsqueda.
    """
    from models.models import TranscriptionCorrection, Airline
    from django.core.cache import cache

    data = cache.get('normalization_data')
    if data:
        return data

    # Construir diccionarios
    corrections = {}
    for obj in TranscriptionCorrection.objects.all():
        corrections[obj.incorrect_text.lower()] = obj.correct_text.lower()

    airlines = {}
    for obj in Airline.objects.all():
        # Mapear variaciones si existieran, o usar corrections.
        # Por ahora, mapeamos ICAO/IATA inversos si son necesarios, 
        # pero la lógica original usaba listas hardcodeadas específicas.
        # Asumiremos que las correcciones fonéticas ("air europa" -> "aireuropa") están en TranscriptionCorrection
        pass
        
    # La lógica original tenía mapeos específicos de alfabeto nato hardcodeados.
    # Usaremos NATO_ALPHABET de constants.py como base.
    
    data = {
        'corrections': corrections,
        # 'airlines': airlines 
    }
    cache.set('normalization_data', data, 300) # 5 minutos cache
    return data

def aerospaceTransform(text):
    text = text.lower()
    data = get_normalization_data()
    corrections = data['corrections']

    # 1. Reemplazo de frases completas (prioridad alta)
    # Optimización: En lugar de iterar todo el dict, buscar coincidencias.
    # Pero para mantener compatibilidad con lógica regex anterior:
    # Ordenar por longitud descendente para evitar reemplazos parciales incorrectos
    sorted_phrases = sorted(corrections.keys(), key=len, reverse=True)
    
    # Esto puede ser lento si hay miles. Para <1000 es ok en Python.
    for phrase in sorted_phrases:
        if phrase in text:
             pattern = re.compile(r'\b' + re.escape(phrase) + r'\b')
             text = pattern.sub(corrections[phrase], text)

    # 2. Reemplazo palabra por palabra
    wrds = text.split()
    new_wrds = []
    for word in wrds:
        # NATO Alphabet
        if word in NATO_ALPHABET:
            new_wrds.append(NATO_ALPHABET[word])
            continue
            
        # Correcciones simples (palabra única)
        if word in corrections:
            new_wrds.append(corrections[word])
            continue
            
        new_wrds.append(word)
    
    return ' '.join(new_wrds)

def filterAndNormalize(text):   
    if not text: return ""
    
    # 1. Limpieza básica
    text = removeCharSet(text, '[', ']')
    text = removeCharSet(text, '<', '>')
    text = removeNonAlphaNum(text)
    
    # 2. Separar números pegados (texto1 -> texto 1)
    text = separateNumbersAndText(text)
    
    # 3. Normalización aeroespacial (DB + NATO)
    text = aerospaceTransform(text)
    
    # 4. Normalización Whisper (texto a números: 'two' -> '2')
    # OJO: whisper normalizer a veces es agresivo.
    # text = normalizer(text) 
    
    # 5. Post-procesamiento
    text = splitNumbersIntoDigits(text)
    text = splitGreetings(text)
    text = text.lower()
    
    text = special_characters_binary_to_asci(text)
    # text = normalizer(text) # Re-aplicar con cuidado
    text = join_consecutive_numbers(text)
    text = join_nato_letters(text)
    text = delete_spaces_between_decimals(text)
    text = capitalize_special_words(text)
    
    return text

# --- Funciones de Utilidad (Pure Functions) ---

def removeCharSet(text, c1, c2):
    pattern = re.escape(c1) + r'.*?' + re.escape(c2)
    return re.sub(pattern, '', text)

def removeNonAlphaNum(text):
    # Mantener espacios y alnum
    return ''.join(c for c in text if c.isalnum() or c == ' ')

def separateNumbersAndText(text):
    return ' '.join(re.split('(\d+)', text))

def splitNumbersIntoDigits(text):
    # "123" -> "1 2 3" (para ATC es mejor separar dígitos salvo niveles de vuelo)
    # La lógica original era compleja. Simplificamos:
    # Si es solo dígitos, separar.
    words = text.split()
    new_words = []
    for word in words:
        if word.isdigit():
            new_words.extend(list(word))
        else:
            new_words.append(word)
    return ' '.join(new_words)

def splitGreetings(text):
    return text.replace('goodbye', 'good bye')

def join_consecutive_numbers(text):
    # "1 4 2" -> "142"
    # PRECAUCIÓN: En ATC "One Four Two" suele ser una frecuencia o rumbo.
    # Unirlos puede ser contraproducente si queremos analizar "Flight Level One Four Zero".
    # Pero mantenemos la lógica original del proyecto por ahora.
    return re.sub(r'(\b\d+\b(?:\s+\b\d+\b)+)', lambda m: ''.join(m.group().split()), text)

def join_nato_letters(text):
    # "A B C" -> "ABC"
    return re.sub(r'\b(?:[A-Z]\s+)+[A-Z]\b', lambda m: ''.join(m.group().split()), text)

def delete_spaces_between_decimals(text):
    # "118 . 5" -> "118.5"
    return re.sub(r'(\d+)\s*\.\s*(\d+)', r'\1.\2', text)

def capitalize_special_words(text):
    pattern = r'\b(' + '|'.join(map(re.escape, SPECIAL_WORDS)) + r')\b'
    return re.sub(pattern, lambda m: m.group(0).upper(), text, flags=re.IGNORECASE)

def special_characters_binary_to_asci(text):
    # Versión simplificada usando unidecode si estuviera disponible, o el dict original
    # Copiamos el dict por compatibilidad, pero reducido porbrevedad aquí (TODO: mover a constants si es muy largo)
    # Por ahora, usaré una implementación simple de reemplazo unicode standard
    import unicodedata
    return ''.join(c for c in unicodedata.normalize('NFD', text)
                   if unicodedata.category(c) != 'Mn')
