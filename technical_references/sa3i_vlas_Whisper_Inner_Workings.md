# Explicación Técnica: Cómo funciona el Motor de Transcripción (Whisper)

**Fecha:** 9 de Diciembre de 2025
**Objetivo:** Desmitificar el proceso de inferencia ASR (Automatic Speech Recognition) para el equipo de desarrollo.

---

## 1. Concepto Fundamental: Audio a Tokens (No a Letras)
El modelo de IA no "escucha" y escribe letras una a una. Funciona mediante **probabilidad estadística de secuencias (Tokens)** basándose en representaciones visuales del sonido.

## 2. El Flujo de Datos (Pipeline de Inferencia)

### Paso 1: Pre-procesamiento (Audio -> Matemáticas)
La librería (`faster-whisper`) toma el archivo de audio crudo (PCM WAV) y realiza una **Transformada de Fourier**.
*   **Input:** Secuencia de amplitudes de onda (0s y 1s del archivo).
*   **Proceso:** Convierte el tiempo en frecuencias. Se normaliza a bloques de 30 segundos.
*   **Output:** **Log-Mel Spectrogram**. Es una matriz (una "imagen") de 80 canales x 3000 frames.
    *   *Analogía:* Convierte la canción en una partitura visual de manchas de calor.

### Paso 2: El Encoder (Red Neuronal Profunda)
El modelo `whisper-large-v3` (la red neuronal) escanea esa "imagen espectral".
*   Tiene capas de "Atención" (Self-Attention) que buscan relaciones.
*   *Ejemplo:* Detecta que una mancha de sonido aguda al principio está relacionada con una mancha grave 2 segundos después (contexto).
*   Genera una representación abstracta de "lo que se ha dicho", pero aún sin palabras.

### Paso 3: El Decoder (Predicción de Tokens)
Aquí se genera el texto. El modelo predice **Tokens**, no letras.
*   Un **Token** puede ser una palabra entera ("Air"), un prefijo ("pre"), un sufijo ("ing") o un signo de puntuación. Whisper usa un vocabulario de ~50,000 tokens.
*   **Proceso Autoregresivo:**
    1.  El modelo mira el audio y predice: *"Probabilidad 99% de que el primer token sea `<StartOfTranscript>`"*.
    2.  Mira el audio + el token anterior y predice: *"Probabilidad 80% de que siga el token `4521` ('Vic')"*.
    3.  Mira audio + `Vic` y predice: *"Probabilidad 95% de que siga el token `892` ('tor')"*.

### Paso 4: Puntuación y Capitalización (Probabilidad Implícita)
¿De dónde salen las mayúsculas y comas si no se pronuncian?
*   El modelo ha sido entrenado con terabytes de texto escrito real (libros, internet).
*   Ha aprendido la **estadística del lenguaje**:
    *   *"Después de un silencio largo (detectado en el espectrograma), la probabilidad de que la siguiente palabra empiece por Mayúscula es del 99%"*.
    *   *"Después de una breve pausa de entonación, la probabilidad de que aparezca el token `,` es alta"*.
*   Por eso la IA "alucina" puntuación: no la oye, la **deduce** por contexto estadístico.

### Paso 5: Detokenización (Salida Final)
La librería toma la lista de números `[4521, 892]` y usa su archivo `tokenizer.json` para convertirlo en texto legible:
*   `[4521, 892]` -> `"Victor"`.

---

## 3. Resumen de Componentes en VLAS
*   **Audio WAV:** La materia prima.
*   **Librería (`faster-whisper`):** La máquina industrial que procesa.
*   **Modelo (`weights.bin`):** El "cerebro" congelado que contiene las estadísticas de probabilidad aprendidas.
*   **Token:** La unidad mínima de información (sílaba/palabra) que maneja la IA.
