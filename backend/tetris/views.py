from rest_framework import generics
from .models import Score
from .serializers import ScoreSerializer


class HighScores(generics.ListCreateAPIView):
    serializer_class = ScoreSerializer

    def get_queryset(self):
        return Score.objects.order_by("-score")[:10]

    def perform_create(self, serializer):
        serializer.save()
