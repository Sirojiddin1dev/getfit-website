from django.shortcuts import render, redirect
from django.core.paginator import Paginator
from django.db.models import Count
from .models import *
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login, logout, authenticate


def login_view(request):
    if request.method == "POST":
        username = request.POST.get('phone_number')
        password = request.POST.get('password')
        usr = authenticate(
            username=username,
            password=password
        )
        if usr is not None:
            login(request, usr)
            return redirect('https://getfit.uz/')
        else:
            context = {
                'error': True
            }
            return render(request, 'login.html', context)

    return render(request, 'login.html')


def sing_up_view(request):
    if request.method == "POST":
        username = request.POST.get('username')
        password = request.POST.get('password')
        phone_number = request.POST.get('phone_number')
        if User.objects.filter(phone_number=phone_number).exists():
            context = {
                'unique': True,
            }
            return render(request, 'sigup.html', context)
        else:
            User.objects.create_user(
                username=phone_number,
                password=password,
                first_name=username,
                phone_number=phone_number,
            )
            return redirect('https://getfit.uz/')
    return render(request, 'sigup.html')


def user_logout(request):
    logout(request)
    return redirect('/')


def lesson_v(request):
    if request.user.is_staff:
        return render(request, 'index.html')
    else:
        return render(request, 'admin.html')
