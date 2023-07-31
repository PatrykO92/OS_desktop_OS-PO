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

    def get(self, request):
        # Define default values for optional query parameters
        country = "us"
        category = None
        page_size = 5  # Default page size

        # Override default values with query parameters if they are present
        if "country" in request.query_params:
            country = request.query_params["country"]
        if "category" in request.query_params:
            category = request.query_params["category"]

        # Make the request to NewsAPI with the optional parameters
        url = "https://newsapi.org/v2/top-headlines"
        params = {"country": country, "apiKey": NEWS_API_KEY, "pageSize": page_size}
        if category:
            params["category"] = category

        response = requests.get(url, params=params)

        # Return the response from NewsAPI
        return Response(response.json())
