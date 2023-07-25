from django.urls import path
from .views import ToDoList, ToDoDetail

urlpatterns = [
    path("<int:pk>/", ToDoDetail.as_view(), name="todo_detail"),
    path("", ToDoList.as_view(), name="todo_list"),
]
