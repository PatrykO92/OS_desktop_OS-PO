from rest_framework import serializers


class NewsSerializer(serializers.Serializer):
    country = serializers.CharField()
    category = serializers.CharField()
