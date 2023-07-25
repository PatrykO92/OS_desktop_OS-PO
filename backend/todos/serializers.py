from rest_framework import serializers

from .models import ToDo


class ToDoSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ("id", "user", "task", "done", "created_at", "updated_at")
        model = ToDo
