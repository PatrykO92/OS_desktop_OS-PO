from django.urls import path
from .views import NewsAPIEndpoint

urlpatterns = [
    path("", NewsAPIEndpoint.as_view()),
]
