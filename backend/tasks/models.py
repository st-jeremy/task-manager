import uuid
from django.db import models

class Task(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255)  # Task title
    description = models.TextField(blank=True)  # Optional task details
    completed = models.BooleanField(default=False)  # Status (done or not)  
    created_at = models.DateTimeField(auto_now_add=True)  # Timestamp for creation
    modified_at = models.DateTimeField(auto_now=True)  # Timestamp for last modification

    def __str__(self):
        return self.title