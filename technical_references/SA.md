# Situational Awareness (SA) - VLAS Project Refactor

## 🗓️ Estado Actual (2025-12-28 11:20)

### 🎯 Objetivo en Curso
**Migración VLAS 3.0 (React + Backend Refactor)**
Estamos en medio de una refactorización mayor para:
1.  Cambiar Frontend de Vue.js a **React** (basado en prototipo nuevo).
2.  Refactorizar Backend a modelo de **Sesión Única** (`CommunicationSession`).
3.  Implementar pipeline de IA (Diarización + Whisper + Gemini) asíncrono.

### 🏗️ Infraestructura y Backend
*   **Base de Datos**: PostgreSQL ha sido reiniciado y está ONLINE. Tablas antiguas borradas.
*   **Modelos**: `models.py` reescrito con esquema `CommunicationSession` y `AudioFile`.
*   **Vistas/API**: `views.py` actualizado con `SessionViewSet`. Endpoints viejos eliminados.
*   **Tareas**: `tasks.py` reescrito para orquestar Pipeline V3.
*   **Docker**:
    *   `docker-compose.yml` actualizado: Frontend en modo DEV (Node Alpine), Variables de entorno fijadas en `.env`.
    *   **Estado del Build**: 🚧 **EN PROCESO**. La imagen `saerco/vlas-server` se está construyendo desde cero. La instalación de dependencias Python (PyTorch, Whisper) está tomando tiempo (>15 min).

### 🎨 Frontend (React)
*   **Estado**: Pendiente de inicialización.
*   **Preparación**: Carpeta `web` original renombrada a `web_legacy`. Nueva carpeta `web` creada.
*   **Próximo Paso**: En cuanto Docker termine el build del backend, lanzaremos el contenedor `frontend` para hacer `npm create vite@latest` dentro del volumen y copiar los componentes del prototipo.

### 📝 Pasos Pendientes Inmediatos
1.  Esperar finalización de `makemigrations` (significa que el build terminó).
2.  Ejecutar `migrate` para crear tablas V3.0 (`CommunicationSession`, etc).
3.  Ejecutar `create_demo_users.py` para generar usuarios: `atco` y `supervisor`.
4.  Levantar stack completo: `docker-compose up -d`.
5.  Inicializar proyecto React en `web/`.

### 🚨 Puntos de Atención
*   El build de Docker es el cuello de botella actual.
*   El contenedor Frontend está configurado para desarrollo (`tail -f /dev/null`) para permitir scaffolding manual.

---
**Comandos útiles para retomar:**
```bash
# Ver logs del build
docker-compose logs -f

# Ejecutar migraciones (una vez termine build)
docker-compose run --rm django python manage.py makemigrations api
docker-compose run --rm django python manage.py migrate

# Crear usuarios
docker-compose run --rm django python create_demo_users.py

# Iniciar Frontend Dev
docker-compose up -d frontend
docker-compose exec frontend sh
# (dentro) npm install && npm run dev
```
