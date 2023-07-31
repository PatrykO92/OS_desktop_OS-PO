from django.http import JsonResponse
from .models import CustomUser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import CheckEmailSerializer


class CheckEmailExistsView(APIView):
    def post(self, request):
        serializer = CheckEmailSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data["email"]
            try:
                CustomUser.objects.get(email=email)
                return Response({"exists": True}, status=status.HTTP_200_OK)
            except CustomUser.DoesNotExist:
                return Response({"exists": False}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
