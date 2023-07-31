from dj_rest_auth.registration.serializers import RegisterSerializer
from dj_rest_auth.serializers import LoginSerializer, UserDetailsSerializer
from rest_framework import serializers
from .models import CustomUser


class CustomRegisterSerializer(RegisterSerializer):
    username = None
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    pin = serializers.CharField()
    user_tag = serializers.CharField()
    avatar = serializers.ImageField()
    settings = serializers.JSONField()

    def get_cleaned_data(self):
        cleaned_data = super().get_cleaned_data()
        cleaned_data["username"] = self.validated_data.get("username", "")
        cleaned_data["email"] = self.validated_data.get("email", "")
        cleaned_data["first_name"] = self.validated_data.get("first_name", "")
        cleaned_data["last_name"] = self.validated_data.get("last_name", "")
        cleaned_data["pin"] = self.validated_data.get("pin", "")
        cleaned_data["user_tag"] = self.validated_data.get("user_tag", "")
        cleaned_data["avatar"] = self.validated_data.get("avatar", None)
        cleaned_data["settings"] = self.validated_data.get("settings", None)
        return cleaned_data

    def save(self, request):
        user = super().save(request)
        user.first_name = self.validated_data.get("first_name", "")
        user.last_name = self.validated_data.get("last_name", "")
        user.pin = self.validated_data.get("pin", "")
        user.user_tag = self.validated_data.get("user_tag", "")
        user.avatar = self.validated_data.get("avatar", None)
        user.settings = self.validated_data.get("settings", None)
        user.save()
        return user


class CustomLoginSerializer(LoginSerializer):
    username = None


class CustomUserDetailsSerializer(UserDetailsSerializer):
    class Meta:
        model = CustomUser
        fields = (
            "pk",
            "email",
            "first_name",
            "last_name",
            "pin",
            "avatar",
            "user_tag",
            "settings",
        )


class CheckEmailSerializer(serializers.Serializer):
    email = serializers.EmailField()
