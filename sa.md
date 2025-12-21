# Situational Awareness - VLAS v2.0 (Hybrid Edition)

## Project Overview
VLAS is an advanced ATC transcription and analysis tool tailored for Spanish airspace (LECU, GCFV).
Current Version State: **v2.2 (Hybrid Whisper + Gemini)**

## Key Features Implemented

### 1. Transcription Pipeline (3-Layer Architecture)
*   **Layer 1: Contextual Prompting (Whisper)**
    *   Updated `airport_prompts.py` for LECU to handle Code-Switching (Spanish/English mix).
    *   Includes examples like "QNH One Zero One Nine".
*   **Layer 2: Deterministic Normalization (Regex)**
    *   Located in `api/transcriber/normalization_rules.py`.
    *   Handles common Whisper errors: `Tower`->`Torre`, `Array`->`X-Ray`.
    *   **CRITICAL FIX:** Added English number words (`zero`, `one`, `nine`) to `COMMON_RULES` to fix QNH formatting issues caused by Whisper's language bias.
*   **Layer 3: Semantic Sanitizer (LLM - *NEW*)**
    *   Located in `api/transcriber/semantic_sanitizer.py`.
    *   **Engine:** moved from Ollama (Phi-4) to **Google Gemini 1.5 Flash** (via Cloud API) for speed and VRAM efficiency.
    *   **Function:** Refines text (fixes punctuation/grammar without altering technical phraseology) and **Auto-Classifies Speakers** (ATCO vs PILOT).
    *   Integrated into `api/tasks.py`.

### 2. Frontend (Vue.js)
*   **Reactive Updates:** Fixed `AudioSegment.vue` to watch for Segment ID changes. This solved the "Error Updating" bug after a Retry operation.
*   **Retry UI:** Now properly reflects changes (blue/gray status transitions) and updates text automatically.

### 3. Infrastructure (Docker)
*   **Hybrid Setup:**
    *   `vlas-celery-1`: Runs Whisper (Local GPU) and connects to Gemini API.
    *   Dependencies: Added `google-generativeai`.
*   **Environment:** requires `GEMINI_API_KEY` in `.env`.

### 4. Known Behaviors
*   **Retry Status:** Transitions `In Process` (Blue) -> `Pending` (Gray, during Rediarization save) -> `In Process` (Blue, Transcribing) -> `Processed` (Green). This is normal architecture behavior.
*   **Performance:** Transcription is now fast (Whisper GPU) + Instant Semantic Analysis (Gemini Flash).

## Recent Fixes (Session Log)
*   Resolved "Exit code 1" on startup (Import error in `normalize.py`).
*   Fixed Docker volume permissions for `/app/media`.
*   Added English-to-Digit normalization for QNH.
*   Switched Semantic Sanitizer from Ollama (VRAM bottleneck) to Gemini API.

## Next Steps / Pending
*   **Validation:** Verify that `ATCO`/`PILOT` classification is accurate with the new stricter prompt.
*   **Refinement:** Continue tuning normalization rules based on real-world checks (e.g. specific callsigns).
*   **Deployment:** The current codebase is stable and "Hybrid-Ready".

---
*Last Updated: 2025-12-19*
