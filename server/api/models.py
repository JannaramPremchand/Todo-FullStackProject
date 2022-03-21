from django.db import models
from datetime import datetime
# Create your models here.
class Tasks(models.Model):
    task = models.CharField(max_length=200, null=False, blank=False)
    description = models.CharField(max_length=200, null=False, blank=False)
    

    def __str__(self):
        return self.task