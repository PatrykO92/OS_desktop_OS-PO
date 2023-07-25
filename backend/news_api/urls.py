from django.urls import path
from .views import NewsAPIEndpoint

urlpatterns = [
    path("get/", NewsAPIEndpoint.as_view()),
]
