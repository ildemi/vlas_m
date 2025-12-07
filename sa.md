# Situational Awareness (SA) - VLAS v2.0 Project

## 1. Project Overview
**VLAS (Voice Legal Analysis System)** is a commercial-grade application designed to:
1.  **Transcribe** Air Traffic Control (ATC) communications using `faster-whisper`.
2.  **Analyze** adherence to phraseology regulations (SERA, RCA) using LLMs (Gemini 1.5 Pro).
3.  **Evaluate** controller performance on a 0-5 scale.

## 2. System Architecture
*   **Root Path:** `c:\Users\esdei\sa3i_vlas`
*   **Backend (`/api`):** Python/Django.
    *   **ASR:** `faster-whisper` (Model: `large-v3` optimized).
    *   **Logic:** `transcriber` app for audio processing, `validator` app for LLM analysis.
*   **Frontend (`/web`):** React + Vite + TypeScript.
*   **Infrastructure:** Dockerized deployment (see `/docker` folder).

## 3. Current Status (2025-12-07)
**Phase:** Technical Debt Cleanup & Git Synchronization.

### Completed Actions
*   **Normalization Refactor:** Successfully decoupled data from logic in `normalize.py`. Created `Airline` and `TranscriptionCorrection` models.
*   **Data Migration:** Prepared `seed_normalization` command to migrate legacy dictionaries to the database.
*   **Docker Optimization:** Added `.dockerignore` and updated build process (currently finalizing).

### Active Issues
*   **Git Synchronization:** Local folder `sa3i_vlas` needs to be reconciled with the remote GitHub repository `vlas_m` (previously pushed from a temporary directory).

## 4. Immediate Action Plan (To-Do)
1.  [ ] **Finalize Docker Build:** Waiting for the heavy `faster-whisper` image build to complete.
2.  [ ] **Run Migrations & Seed:** Execute `makemigrations`, `migrate`, and `seed_normalization`.
3.  [ ] **Fix Git Remote:**
    *   Initialize/Check git in `c:\Users\esdei\sa3i_vlas`.
    *   Set remote to `vlas_m` repo.
    *   Force push or pull/rebase to sync history.
    *   Clean up `filterAndNormalize` pipeline.
2.  [ ] **Verify Docker Environment:** Ensure `docker-compose.yml` builds the specific VLAS v2.0 stack correctly.
3.  [ ] **RAG Integration:** Process PDFs in `/sources` for the Validation Agent.

## 5. Recovery Instructions (If Session Resets)
If you "wake up" and this is the first file you read:
1.  Verify you are in `c:\Users\esdei\sa3i_vlas`.
2.  Check if `api/transcriber/normalize.py` has been cleaned (file size should be < 5KB, currently ~22KB).
3.  Resume the "Immediate Action Plan" from the top unchecked item.
