from django.db import models

from django.contrib.auth.models import User


class Diary(models.Model):
    private = models.BooleanField()
    #anonymous
    analysis = models.JSONField(null=True)
    likes = models.IntegerField(default=0)
    entry = models.CharField(max_length=200, blank=True)
    owner = models.ForeignKey(
        User, related_name="diaries", on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

