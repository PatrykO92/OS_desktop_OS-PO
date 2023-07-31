from django.urls import path
from .views import CheckEmailExistsView

urlpatterns = [
    path("check_user", CheckEmailExistsView.as_view()),
]
