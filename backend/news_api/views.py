import requests
from environs import Env
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .serializers import NewsSerializer

env = Env()
env.read_env()

NEWS_API_KEY = env.str("NEWS_API_KEY")


class NewsAPIEndpoint(APIView):
    serializer_class = NewsSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request):
        country = "us"
        category = None
        page_size = 5

        if "country" in request.data:
            country = request.data["country"]
        if "category" in request.data:
            category = request.data["category"]

        url = "https://newsapi.org/v2/top-headlines"
        params = {"country": country, "apiKey": NEWS_API_KEY, "pageSize": page_size}
        if category:
            params["category"] = category

        response = requests.get(url, params=params)

        return Response(response.json())
