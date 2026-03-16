# Roadmap Técnológico: VLAS v2.3 - "The Intelligent Cleaner"

**Estado:** Planificación
**Objetivo Principal:** Implementar una estrategia de corrección de transcripción en 3 niveles para maximizar la precisión de la evaluación de desempeño ATCO.

---

## 1. Visión General: Arquitectura en Capas (The Layered Approach)

Para lograr una precisión comercial (>99%), VLAS v2.3 abandonará la transcripción simple en favor de un pipeline de refinamiento progresivo.

| Nivel | Nombre | Tecnología | Objetivo | Estado Actual |
| :--- | :--- | :--- | :--- | :--- |
| **L1** | **Base Determinista** | Whisper Prompt + Regex DB | Eliminar errores sistemáticos y obvios. | 🟢 Parcial (Prompt mejorable) |
| **L2** | **Sanitizador Semántico** | LLM (Ollama/Phi-4) | Corregir errores fonéticamente plausibles pero aeronáuticamente incorrectos. | 🔴 Pendiente |
| **L3** | **Data Engine (I18n)** | Feedback Loop + DB | Preparar el terreno para Fine-Tuning y Multi-idioma. | 🔴 Pendiente |

---

## 2. Detalle de Tareas (Workstreams)

### FASE 1: Consolidación del Nivel 1 (Inmediato)
*La base debe ser sólida antes de añadir IA compleja.*

1.  **Optimización del Whisper Prompt (Context Priming):**
    *   **Problema:** El prompt actual tiene "basura" (palabras funcionales) y desperdicia el límite de **224 tokens**.
    *   **Solución:** Reescribir `transcriber.py` con un prompt denso en entidades nombradas (Waypoints LEMD/LECM, Aerolíneas locales, Terminología crítica).
2.  **Filtrado de Segmentos Fantasma (VAD Cleaning):**
    *   **Problema:** Pyannote detecta ruidos <0.5s como segmentos, ensuciando la interfaz.
    *   **Solución:** Implementar filtro en `tasks.py` para descartar segmentos de duración irrelevante o vacíos antes de guardar en DB.

### FASE 2: Implementación del Nivel 2 (The Sanitizer)
*El "Corrector Ortográfico" de la aviación.*

1.  **Nuevo Agente: `Sanitizer`:**
    *   Módulo Python que envuelva una llamada a Ollama (rápida, baja temperatura).
2.  **Prompt Engineering:**
    *   Diseñar el prompt de sistema: *"Eres un experto en fraseología ATC. Corrige la transcripción fonética SIN cambiar el significado. Ej: 'Iberia tree' -> 'Iberia 3'."*
3.  **Integración en Pipeline:**
    *   Insertar paso en Celery: `Whisper` -> `Normalize (Regex)` -> `Sanitizer (LLM)` -> `DB`.

### FASE 3: Preparación del Nivel 3 (Internationalization & Data)
*Pensando en VLAS Global.*

1.  **Soporte Multi-Idioma (i18n):**
    *   Migración de DB: Añadir campo `language` (es, en, fr) al modelo `TranscriptionCorrection`.
    *   Adaptar `seed_normalization.py` para poblar reglas específicas por idioma.
2.  **Training Loop:**
    *   Mecanismo para marcar segmentos corregidos manualmente por humanos como "Golden Data" para futuro entrenamiento (Fine-Tuning v3.0).

---

## 3. Criterios de Éxito v2.3

*   [ ] **Cero Segmentos Vacíos:** No deben aparecer cajas de texto vacías en el frontend.
*   [ ] **Prompt Optimizado:** El prompt inicial usa <224 tokens y maximiza la cobertura de terminología española.
*   [ ] **Sanitizador Activo:** El sistema corrige "Iberia tree" a "Iberia 3" incluso si no está en el diccionario regex.
*   [ ] **i18n Ready:** La base de datos distingue reglas en Español vs Inglés.
