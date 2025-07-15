from django.http import HttpResponse 
from django.shortcuts import render

# Create your views here.
def index(request):
    return HttpResponse("Hello!")

def nolan(request):
    return HttpResponse("Hello, Nolan!")

def person(request):
    return HttpResponse("Hello there, have a nice day!")

def greet(request, name):
    return HttpResponse(f"Hello, {name.capitalize()}!")