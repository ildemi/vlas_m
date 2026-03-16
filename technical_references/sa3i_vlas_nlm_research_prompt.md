# Prompt para NotebookLM: Investigación para Evolución de VLAS (VLAS v3.0)

**Instrucción para NotebookLM:**

"Quiero realizar una investigación profunda para crear una aplicación totalmente funcional y comercializable dirigida a controladores aéreos (ATCOs), supervisores y proveedores de servicios de navegación aérea (ANSPs). El objetivo es desarrollar una herramienta de **Control de Calidad y Reforzamiento de la Seguridad Operacional** basada en el análisis de comunicaciones por voz.

Actualmente disponemos de un prototipo (VLAS) que ya realiza transcripción (Whisper), diarización y validación básica de normativa (con LLMs), pero necesitamos evolucionarlo a un producto de grado industrial.

Por favor, actúa como un **Experto en Seguridad Aérea y Arquitecto de Software** y realiza una investigación exhaustiva utilizando tus fuentes disponibles (y la web si tienes acceso) para responder a los siguientes puntos clave:

### 1. Estado del Arte y Competencia
*   ¿Qué herramientas comerciales existen actualmente para el análisis automático de voz en ATM (Air Traffic Management)? (Investiga empresas como *Frequentis*, *Indra*, *Thales* o startups especializadas en *Aviation Voice AI*).
*   ¿Qué funcionalidades específicas ofrecen estas herramientas? (Ej: detección de fatiga, alertas en tiempo real, análisis de "Read-back/Hear-back errors", detección de congestión en la frecuencia).
*   ¿Cuáles son las limitaciones actuales de estas soluciones?

### 2. Marcos Regulatorios y Estándares
*   ¿Qué dicen las normas de **OACI (ICAO)** y **EASA** sobre el uso de sistemas automáticos para auditoría de seguridad? (Referencia documentos como el ICAO Doc 9859 - Safety Management Manual, o regulaciones sobre *Occurrence Reporting*).
*   ¿Existen estándares de privacidad o protección de datos específicos para la grabación de voces de controladores en la UE?

### 3. Necesidades del Usuario (Stakeholders)
Define los "Dolores" y "Ganancias" para los siguientes perfiles:
*   **El Controlador (ATCO):** ¿Cómo puede esta herramienta ayudarle a mejorar sin sentir que es un sistema punitivo? (Ej: Feedback personal post-turno, entrenamiento).
*   **El Supervisor/Instructor:** ¿Qué métricas de alto nivel necesitan? (Ej: Dashboards de cumplimiento de fraseología por sector, identificación de desviaciones recurrentes).
*   **El Proveedor (ANSP):** ¿Qué valor aporta a nivel de negocio y seguridad operacional? (Ej: Optimización del entrenamiento, reducción de incidentes).

### 4. Requisitos Funcionales Recomendados
Basado en lo anterior, propón una lista de **"Must-Have features"** para una aplicación de este tipo, divididas en:
*   **Análisis de Seguridad:** (Ej: Detección de colaciones incorrectas críticas, confusión de Call-signs).
*   **Métricas Operativas:** (Ej: Tasa de ocupación de frecuencia, velocidad de habla, solapamientos).
*   **Gestión del Conocimiento:** (Ej: Generación automática de informes de incidentes).

### 5. Tecnología
*   ¿Qué avances recientes en IA (modelos multimodales, SLMs como Phi-4/Gemini Flash) son más prometedores para este caso de uso específico donde la precisión es crítica y el hardware puede ser limitado?
"
