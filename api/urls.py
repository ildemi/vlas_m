from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    login, register, SessionViewSet, SegmentUpdateView
)

# Router automático para ViewSets
router = DefaultRouter()
router.register(r'sessions', SessionViewSet, basename='session')

urlpatterns = [
    # Auth Endpoints
    path('auth/login/', login, name='login'),
    path('auth/register/', register, name='register'),
    
    # Resource Endpoints (via Router)
    path('', include(router.urls)), # Incluye /sessions/, /sessions/{id}/, /sessions/upload/

    # Segment Editing (Granular updates)
    path('segments/<uuid:pk>/', SegmentUpdateView.as_view(), name='segment-update'),
]
