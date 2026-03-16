import os
import django
from django.conf import settings

# Setup Django environment manually if run as standalone script
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'transcriptionAPI.settings')
django.setup()

from django.contrib.auth.models import User
from api.models.models import CommunicationSession

def create_users():
    print(" Creating demo users...")

    # 1. Superuser
    if not User.objects.filter(username='admin').exists():
        User.objects.create_superuser('admin', 'admin@example.com', 'admin')
        print(" [OK] Superuser 'admin' created.")
    else:
        print(" [SKIP] Superuser 'admin' exists.")

    # 2. ATCO User
    if not User.objects.filter(username='atco').exists():
        u = User.objects.create_user('atco', 'atco@saerco.com', 'atco123')
        u.first_name = "John"
        u.last_name = "Doe"
        u.save()
        print(" [OK] User 'atco' created.")
    else:
        print(" [SKIP] User 'atco' exists.")

    # 3. Supervisor User
    if not User.objects.filter(username='supervisor').exists():
        u = User.objects.create_user('supervisor', 'supervisor@saerco.com', 'supervisor123')
        u.first_name = "Sarah"
        u.last_name = "Chen"
        u.is_staff = True # Maybe? Or just a role field?
        u.save()
        print(" [OK] User 'supervisor' created.")
    else:
        print(" [SKIP] User 'supervisor' exists.")

if __name__ == '__main__':
    try:
        create_users()
        print("User creation complete.")
    except Exception as e:
        print(f"Error creating users: {e}")
