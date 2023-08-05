from django.urls import path
from .views import CheckEmailExistsView, CustomUserSettingsUpdateView

urlpatterns = [
    path("check_user", CheckEmailExistsView.as_view()),
    path("update_settings", CustomUserSettingsUpdateView.as_view()),
]
