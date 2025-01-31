from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(read_only=True)  # Ensure UUID is included

    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'completed', 'created_at', 'modified_at']  # Explicitly list all fields
