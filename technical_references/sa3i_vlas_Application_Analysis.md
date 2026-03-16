# Análisis Técnico de la Aplicación SA3I_VLAS (VLAS)

Este documento detalla la arquitectura, funcionamiento y componentes clave del sistema SA3I_VLAS (VLAS), una solución avanzada para la transcripción y validación de comunicaciones de control de tráfico aéreo (ATC).

## 1. Propósito General
VLAS actúa como un asistente inteligente diseñado para auditar y analizar comunicaciones entre controladores (ATCOs) y pilotos. Sus objetivos principales son:

*   **Transcripción de Alta Fidelidad**: Convertir audios complejos (con mezcla de idiomas español/inglés, ruido estático y terminología técnica) en texto preciso.
*   **Validación Normativa**: Verificar el cumplimiento de estándares OACI, incluyendo el uso correcto de fraseología, colación (read-back), distintivos de llamada (callsigns) y pureza del lenguaje.
*   **Gestión de Flujo de Trabajo**: Proveer una interfaz para la revisión humana, corrección y generación de informes de cumplimiento.

## 2. Arquitectura del Sistema
El proyecto sigue una arquitectura de microservicios modularizada y conteinerizada mediante Docker, separando claramente el frontend del backend y los servicios de procesamiento pesado.

### 2.1 Backend (Python / Django)
El núcleo del sistema está construido sobre tecnologías robustas de Python.

*   **Framework Web**: Django 5.1 junto con Django REST Framework (DRF) para exponer una API RESTful consumida por el frontend.
*   **Procesamiento Asíncrono (Celery)**:
    *   Utiliza **Celery** para desacoplar tareas intensivas en CPU/GPU (transcripción, diarización, validación con LLM) del ciclo de petición/respuesta HTTP.
    *   Esto garantiza que la interfaz de usuario permanezca receptiva incluso durante cargas de trabajo pesadas.
*   **Persistencia**: PostgreSQL como base de datos relacional principal.
*   **Inteligencia Artificial y ML**:
    *   **Motor de Transcripción**: Implementa **Faster-Whisper** (basado en CTranslate2) para una inferencia optimizada y veloz. Incluye lógica de *Context Priming*, inyectando prompts iniciales con terminología específica de aeropuertos (e.g., LEMD, LEBL) para mejorar la precisión fonética.
    *   **Motor de Validación (Agentes)**: Utiliza **LangGraph** y **LangChain** para orquestar un flujo de validación complejo. No es una simple cadena lineal, sino un grafo de estados que permite bucles de retroalimentación y supervisión.
    *   **Inferencia LLM**: Se conecta a modelos locales (como phi4 o llama3) a través de **Ollama**, permitiendo privacidad total de los datos procesados.
    *   **Diarización**: Módulo dedicado (`diarizer.py`) para segmentar el audio e identificar cambios de hablante.

### 2.2 Frontend (Vue.js)
La interfaz de usuario es una Single Page Application (SPA) moderna.

*   **Framework**: Vue 3 utilizando la Composition API y TypeScript para mayor robustez.
*   **Build Tool**: Vite para un desarrollo y compilación ultrarrápidos.
*   **Gestión de Estado**: Pinia, manejando la sesión del usuario y el estado de los grupos de transcripción.
*   **Estilos**: Bootstrap y Bootstrap Icons para una UI limpia y funcional.
*   **Vistas Principales**:
    *   **GroupDetailView**: Un entorno de edición complejo donde los usuarios pueden visualizar segmentos de audio (Speech Segments), corregir transcripciones manuales y reordenar audios.
    *   **ValidationResultsView**: Panel de visualización de errores que muestra desviaciones de la norma (fraseología incorrecta, fallos de colación) detectados por el agente de IA.

## 3. Flujo de Trabajo (Workflow)

El ciclo de vida de un dato en VLAS es el siguiente:

1.  **Ingesta**: El usuario crea un "Grupo de Transcripción" y sube múltiples archivos de audio.
2.  **Pre-procesamiento (Background)**:
    *   El sistema ejecuta la **Diarización** para dividir el audio en segmentos de voz distintos.
    *   Se ejecuta la **Transcripción** automática usando el modelo Whisper fine-tuneado para ATC.
3.  **Human-in-the-loop (Edición)**:
    *   El usuario revisa la transcripción automática en la web.
    *   Corrige errores de texto y asigna/verifica los roles de los hablantes (ATCO vs Piloto).
4.  **Validación Agéntica**:
    *   El usuario inicia el proceso de validación.
    *   El `Validator` (agente LangGraph) procesa la conversación a través de un grafo de nodos:
        *   `Identify Rule`: Detecta qué norma aplica a la frase.
        *   `Check Language`: Verifica que no haya mezcla indebida de idiomas.
        *   `Check Collation`: Valida si el piloto repitió correctamente las instrucciones críticas.
        *   `Check Callsign`: Asegura el uso correcto de las matrículas.
        *   `Check Phraseology`: Compara lo dicho con la fraseología estándar.
        *   **Supervisor**: Un nodo especial que revisa las conclusiones del LLM para mitigar alucinaciones.
5.  **Reporte**: Se presentan los resultados y puntuaciones, permitiendo la exportación a PDF para auditoría.

## 4. Componentes Clave del Código

*   **`api/transcriber/transcriber.py`**:
    *   Clase `TranscriptionAgent`.
    *   Gestiona la carga de modelos (CPU/GPU) de forma dinámica.
    *   Implementa la lógica de inyección de contexto (prompts ATC) para guiar al modelo Whisper.

*   **`api/validator/validation.py`**:
    *   Clase `Validator`.
    *   Define el `StateGraph` de LangGraph.
    *   Contiene la lógica de evaluación de reglas y los prompts del sistema para los LLMs.

*   **`api/api/views.py`**:
    *   Controladores de Django REST Framework.
    *   Maneja la lógica de negocio compleja: creación de grupos, gestión de archivos, reintentos de transcripción y coordinación de tareas de Celery.

## 5. Stack Tecnológico

| Capa | Tecnología |
| :--- | :--- |
| **Backend** | Python 3.10+, Django 5.1, DRF |
| **Cola de Tareas** | Celery, Redis/AMQP |
| **Base de Datos** | PostgreSQL |
| **ML / IA** | PyTorch, Faster-Whisper, CTranslate2, LangGraph, LangChain |
| **Inferencia LLM** | Ollama (Modelos locales: phi4, llama3, etc.) |
| **Frontend** | Vue.js 3, TypeScript, Vite, Pinia, Bootstrap |
| **Infraestructura** | Docker, Docker Compose, Scripts Bash |
