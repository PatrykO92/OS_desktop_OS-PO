from django.urls import path
from .views import HighScores

urlpatterns = [
    path("", HighScores.as_view(), name="Highscores"),
]
