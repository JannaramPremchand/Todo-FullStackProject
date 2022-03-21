from dataclasses import fields
from pyexpat import model
from rest_framework import serializers
from . models import *

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model=Tasks
        fields = "__all__"