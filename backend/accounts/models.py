# accounts/models.py
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models import JSONField


class CustomUser(AbstractUser):
    name = models.CharField(null=True, blank=True, max_length=100)
    last_name = models.CharField(null=True, blank=True, max_length=100)
    pin = models.CharField(null=True, blank=True, max_length=10)
    avatar = models.ImageField(null=True, blank=True, upload_to="avatars/")
    user_tag = models.CharField(null=True, blank=True, max_length=20)
    settings = JSONField(null=True, blank=True)
