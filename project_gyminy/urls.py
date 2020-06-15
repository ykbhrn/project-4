"""project_gyminy URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/articles/', include('articles.urls')),
    path('api/images/', include('images.urls')),
    path('api/trainings/', include('trainings.urls')),
    path('api/videos/', include('videos.urls')),
    path('api/sports/', include('sports.urls')),
    path('api/types/', include('user_type.urls')),
    path('api/comments/', include('comments.urls')),
    path('api/', include('jwt_auth.urls'))
]
