from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("<str:name>", views.greet, name="greet"),
    path("nolan", views.nolan, name="nolan"),
    path("person", views.person, name="person")
]