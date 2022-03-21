from django.contrib import admin
from django.urls import path,include
from api.views import TaskView
from rest_framework import routers 
from django.views.generic import TemplateView

route = routers.DefaultRouter()
route.register("", TaskView, basename="Taskview")


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(route.urls)),
    path('', TemplateView.as_view(template_name='index.html')),
]