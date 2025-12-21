# Nota de Lanzamiento: VLAS v2.2 (Technical Release Note)

**Fecha:** 9 de Diciembre de 2025  
**Versión:** 2.2 "Foundation & Normalization"  
**Estado:** Estable / Desplegado en Local

---

## 1. Resumen Ejecutivo
VLAS v2.2 marca la transición de un prototipo experimental a una **arquitectura de producción robusta**. Esta versión se centra en tres pilares: **Eficiencia** (cambio de motor de inferencia), **Estabilidad** (arranque asíncrono) y **Calidad de Datos** (normalización dinámica).

---

## 2. Evolución Cronológica de Mejoras (Timeline)

### 2.1. Cambio de Motor: `faster-whisper` y CTranslate2
**El Problema:** La implementación original de OpenAI Whisper (PyTorch puro) era lenta y consumía excesiva VRAM (>6GB), provocando cuellos de botella en la inferencia.
**La Solución (v2.1):**
*   Migración a **`faster-whisper`**: Implementación basada en **CTranslate2**.
*   **Cuantización:** Soporte nativo para `float16` y `int8`, reduciendo el uso de memoria a <3GB sin pérdida perceptible de precisión.
*   **Resultado:** Aumento de velocidad de inferencia de **4x** en GPU NVIDIA RTX.
*   *Referencia Técnica:* `api/transcriber/transcriber.py` (Clase `TranscriptionAgent`).

### 2.2. Inicialización Asíncrona de Modelos (User Experience)
**El Problema:** Al arrancar el sistema, el backend intentaba cargar los modelos (Whisper 3GB + Ollama) en el hilo principal de Django. Esto causaba *Timeouts* de HTTP (504 Gateway Timeout) y dejaba al usuario sin feedback visual durante 30-60 segundos.
**La Solución:**
*   **Celery Bootstrap:** Se movió la carga de modelos a una tarea de Celery (`initialize_backend_models`).
*   **Feedback en Frontend:** Implementación de `SystemInitializer.vue` en React, que consulta periódicamente el estado de carga y muestra un indicador de progreso paso a paso ("Cargando Whisper...", "Conectando Ollama...").
*   *Referencia Técnica:* `api/tasks.py` y `web/src/components/SystemInitializer.vue`.

### 2.3. Saneamiento de Arquitectura (Backend Refactor)
**El Problema:** Deuda técnica acumulada con dos aplicaciones Django en conflicto (`api` vs `models`), duplicando lógica y causando errores de importación circular.
**La Solución:**
*   **Unificación:** Eliminación de la app `models`. Ahora `api` es la única fuente de verdad.
*   **Centralización:** Todos los modelos (`AudioTranscription`, `TranscriptionGroup`, `SpeechSegment`) residen en `api/models.py`.

### 2.4. Motor de Normalización Dinámica (Layer 2)
**El Problema:** Las correcciones de transcripción (ej: "Victoria" -> "Victor") estaban "hardcodeadas" en archivos de Python. Modificar una regla requería reiniciar el servidor.
**La Solución (v2.2 Final):**
*   **Database-Driven Rules:** Creación del modelo `TranscriptionCorrection` en PostgreSQL.
*   **Inyección Dinámica:** El transcriptor carga las reglas desde la DB en tiempo de ejecución (con caché).
*   **Seeding:** Script de migración (`seed_normalization.py`) que pobló la DB con diccionarios aeronáuticos legacy, alfabeto NATO y mapeo numérico ("uno" -> "1").
*   **Gestión:** Ahora las reglas se pueden editar en caliente desde el Panel de Administración de Django.

### 2.5. Quality of Life Hotfixes (v2.2.1)
**Mejoras de última hora para producción:**
*   **Prompt Engineering Optimizado:** Se reescribió el `INITIAL_PROMPT` de Whisper para maximizar la densidad de información (Alfabeto completo, Callsigns españoles) dentro del límite de 224 tokens, eliminando palabras de relleno.
*   **Filtro de Segmentos Fantasma:** Implementación de un "Noise Gate" en el worker que descarta automáticamente cualquier transcripción vacía o menor a 2 caracteres y segmentos de audio < 0.5 segundos, limpiando la interfaz de usuario de cajas vacías.

---

## 3. Estado Actual de la Arquitectura
La versión 2.2 opera bajo un flujo de **Microservicios Orquestados**:

1.  **Frontend (Vite/React):** Checkea estado de IA -> Sube Audio.
2.  **BFF (Django):** Recibe audio -> Crea Tarea Celery.
3.  **Worker (Celery + GPU):**
    *   **Diarización:** Pyannote (Separación de locutores).
    *   **Transcripción:** `faster-whisper` (Large-v3 ATCO2).
    *   **Normalización (v2.2):** Consulta DB -> Reglas Regex/Dict -> Texto Limpio.
4.  **Almacenamiento:** PostgreSQL (Persistencia de Resultados).

---

## 4. Próximos Pasos (Hacia v3.0)
*   **Internacionalización (i18n):** Añadir campo `language` a las reglas de corrección.
*   **Data Engine loop:** Convertir las correcciones manuales de usuario en datasets de entrenamiento (Fine-Tuning).
