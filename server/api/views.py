
from .models import *
from .serializers import *
from rest_framework import viewsets
# Create your views here.
class TaskView(viewsets.ModelViewSet):
    queryset = Tasks.objects.all()
    serializer_class = TaskSerializer