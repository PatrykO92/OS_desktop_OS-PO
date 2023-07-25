from django.contrib import admin
from .models import CustomUser

# Register the CustomUser model with the admin site
admin.site.register(CustomUser)
