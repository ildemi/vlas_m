# SA3I VLAS (v2.0) - Especificación de Diseño UI/UX

## 1. Visión del Producto
**SA3I VLAS** (Voice Logistics & Analysis System) es una plataforma SaaS profesional para el análisis impulsado por IA de comunicaciones de control de tráfico aéreo (ATC).
La aplicación permite a Controladores (ATCOs), Supervisores y Auditores subir audios, transcribirlos automáticamente, y evaluar el cumplimiento de la normativa (SERA/RCA).

**Estética Deseada:**
*   Tema: "Aviation Dark Mode". Fondo oscuro profesional (azules profundos/grises), alto contraste para legibilidad en entornos con poca luz (torres de control).
*   Sensación: Instrumentación de precisión, moderna, rápida.
*   Framework Técnico Preferido para el prototipo: **Vue 3 (Composition API) + Tailwind CSS** (o CSS limpio).

---

## 2. Mapa del Sitio y Pantallas Requeridas

### A. Módulo de Autenticación (Público)
Es la puerta de entrada. Debe transmitir seguridad y robustez.

1.  **Login (Sign In):**
    *   Campos: Email corporativo, Password.
    *   Acciones: "Entrar", "Olvidé mi contraseña", enlace a "Registrarse".
    *   *Vibe:* Minimalista. Quizás una imagen de fondo sutil (radar, torre) muy desenfocada.

2.  **Registro (Sign Up):**
    *   Campos: Nombre completo, Email, Licencia ATC (Opcional), Password, Confirmar Password.
    *   Selector de Rol Solicitado: Controlador (ATCO) o Supervisor.
    *   **Importante:** Nota visual de que el registro requiere aprobación de un administrador o un código de unidad.

### B. Módulo de Aplicación (Privado)
Layout con **Sidebar Lateral Izquierdo** (Navegación) y **Top Bar** (Usuario/Notificaciones).

3.  **Dashboard (Home):**
    *   Varía según rol, pero estructuralmente incluye:
    *   **Tarjetas de Resumen (KPIs):** "Sesiones analizadas", "Puntuación Media (0-5)", "Alertas de Seguridad".
    *   **Gráfico de Tendencia:** Línea temporal de mejora en la fraseología.
    *   **Actividad Reciente:** Lista compacta de las últimas 5 sesiones subidas.

4.  **Mis Sesiones / Sesiones de Unidad (Listado):**
    *   Tabla avanzada (Data Grid).
    *   Columnas: ID, Fecha, Operador (Controlador), Puntuación (Badge de color: Verde/Amarillo/Rojo), Estado (Procesando/Listo).
    *   Filtros: Por fecha, por puntuación.
    *   Botón principal (Floating o fijo arriba): **"Nueva Sesión"**.

5.  **Carga de Nueva Sesión (Upload):**
    *   Zona de "Drag & Drop" grande y clara para ficheros de audio.
    *   Formulario de metadatos adjunto:
        *   Unidad (Selector: TWR Norte, GND Sur, etc.).
        *   Fecha/Hora (Picker).
        *   Frecuencia (Input numérico).

6.  **Workbench de Análisis (La pantalla principal):**
    *   Debe parecer un editor de audio/video profesional.
    *   **Top:** Waveform de audio navegable. Controles de reproducción (Play, Pause, Velocidad 1.5x).
    *   **Centro:** Transcripción tipo Chat/Script.
        *   Diferenciar visualmente **ATCO** (derecha/color A) vs **PILOT** (izquierda/color B).
        *   **Tags de IA:** Las frases incorrectas deben estar subrayadas o marcadas en rojo. Al hacer hover, mostrar explicación del error normativo.
    *   **Side (Derecha):** Panel de "Hallazgos" y Puntuación. Resumen de los errores encontrados en esa sesión.

7.  **Administración (Settings):**
    *   Gestión de Unidad: Invitar usuarios, ver lista de controladores.
    *   Ajustes de Cuenta.

---

## 3. Paleta de Colores (Referencia)
*   **Fondo App:** `#0F172A` (Slate 900) - Oscuro profundo.
*   **Paneles/Tarjetas:** `#1E293B` (Slate 800) - Ligeramente más claro.
*   **Acento Principal:** `#0EA5E9` (Sky 500) o `#3B82F6` (Blue 500) - Para botones y enlaces activos.
*   **Éxito:** `#10B981` (Emerald 500) - Puntuaciones altas, sin errores.
*   **Alerta/Warning:** `#F59E0B` (Amber 500) - Fraseología dudosa.
*   **Error/Critico:** `#EF4444` (Red 500) - Colación incorrecta, incidente de seguridad.
