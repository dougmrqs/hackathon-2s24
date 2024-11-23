import uuid

from django.db import models

class Credential(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    username = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    user = models.ForeignKey('users.User', on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.service} - {self.username}'
