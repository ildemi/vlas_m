# Briefing de Diseño UX/UI - Proyecto VLAS
**Versión:** 1.0  
**Objetivo:** Guía funcional para la propuesta de diseño de interfaz y experiencia de usuario.

---

## 1. ¿Qué es VLAS?
VLAS es una herramienta profesional de auditoría y seguridad operacional diseñada para el ámbito de la **Navegación Aérea**. Su función principal es analizar las grabaciones de voz de las comunicaciones por radio entre Controladores de Tránsito Aéreo (ATCOs) y Pilotos.

El sistema transcribir el audio a texto automáticamente y, lo más importante, **audita el cumplimiento de la normativa aeronáutica**, detectando errores en la comunicación que podrían poner en riesgo la seguridad.

## 2. Perfil del Usuario
*   **Usuarios Principales:** Auditores de seguridad, Instructores de controladores y Controladores Aéreos.
*   **Contexto de Uso:** Entorno de oficina profesional. El usuario necesita concentración y precisión.
*   **Necesidades Clave:** Claridad visual, rapidez para revisar grandes volúmenes de texto/audio y facilidad para identificar errores críticos.

---

## 3. Flujo de Trabajo Principal (User Journey)
El diseño debe cubrir las siguientes etapas del proceso:

### A. Gestión y Organización (El Dashboard)
El usuario necesita un panel de control donde pueda ver su historial de trabajos (llamados "Grupos de Transcripción").
*   **Requisito Visual:** Lista de expedientes/grupos con indicación clara de su estado: *En Proceso*, *Transcribed* (Listo para revisar), *Validado*, o *Error*.
*   **Acciones:** Crear nuevo análisis, borrar, buscar/filtrar por fecha o nombre.

### B. Ingesta de Datos (Creación)
Una interfaz sencilla para subir los archivos de audio.
*   **Funcionalidad:** "Drag & Drop" de múltiples archivos de audio.
*   **Configuración:** Nombrar el grupo de trabajo y seleccionar el contexto (ej. Aeropuerto específico).
*   **Feedback:** Barras de progreso de subida.

### C. El Editor de Transcripción (La Mesa de Trabajo)
Esta es la pantalla más compleja e importante. El sistema presenta el audio ya procesado y convertido a texto, pero el usuario debe poder revisarlo y corregirlo.
*   **Visualización del Diálogo:** Diseño tipo "Chat" o guion, diferenciando claramente quién habla: **CONTROLADOR** vs **PILOTO**.
*   **Sincronización Audio-Texto:** Al hacer clic en un texto, debe reproducirse ese fragmento de audio específico.
*   **Herramientas de Edición:**
    *   Editar el texto transcrito (si la IA falló).
    *   Cambiar el rol del hablante (si la IA confundió al piloto con el controlador).
    *   **Reordenar:** Posibilidad de arrastrar y soltar (Drag & Drop) los fragmentos de diálogo si quedaron desordenados cronológicamente.
    *   Eliminar fragmentos que sean solo ruido.

### D. Visualización de Resultados (La Auditoría)
Una vez el usuario está conforme con la transcripción, solicita la "Validación". El diseño debe mostrar el reporte de calidad generado por la IA.
*   **Resumen Ejecutivo:** Puntuación global del cumplimiento (ej. Gráfico de "Score" o semáforo).
*   **Detalle de Errores:** El sistema debe resaltar en el texto los fallos encontrados, categorizados por:
    *   **Fraseología Incorrecta:** Uso de palabras no estándar.
    *   **Error de Colación:** El piloto no repitió correctamente las instrucciones (Crítico).
    *   **Uso del Idioma:** Mezcla indebida de español/inglés.
    *   **Callsigns:** Errores en las matrículas de los aviones.
*   **Explicabilidad:** Al pasar el ratón (hover) o hacer clic en un error, el sistema debe mostrar una "burbuja" o panel explicando *por qué* está mal según la norma.

### E. Exportación
*   Botón claro para descargar un **Informe PDF** oficial con los resultados de la auditoría.

---

## 4. Requisitos de Estilo y Sensaciones (Look & Feel)
*   **Profesional y Sobrio**: Evitar diseños excesivamente "gamers" o infantiles. Debe parecer una herramienta de ingeniería o medicina.
*   **Legibilidad**: Tipografías claras y alto contraste. Es una herramienta de lectura intensiva.
*   **Código de Colores Semántico**:
    *   Uso estándar de colores para estados: Verde (Correcto/Procesado), Azul (En proceso/Neutro), Rojo/Naranja (Errores de seguridad/Alertas).
*   **Densidad de Información**: Equilibrio entre mostrar mucha información (textos largos) y mantener la interfaz limpia.
