from django.shortcuts import render, redirect
from main.models import User, Video, Coupon, UserDevice
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.contrib.auth import login, logout, authenticate
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import ListAPIView, ListCreateAPIView, UpdateAPIView, DestroyAPIView
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404, Http404
import hashlib
from rest_framework import status
import requests
import json
import requests
from django.db import IntegrityError
from django.core.validators import RegexValidator
from django.core.exceptions import ValidationError
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.utils import timezone
import httpagentparser


def video_list(request, category):
    if not request.user.is_authenticated:
        return redirect('login')
    if request.user.status == 'Block':
        logout(request)
        return redirect('login')

    videos = Video.objects.filter(category=category)
    valid_video_ids = [video.video_id for video in videos]

    if not valid_video_ids:
        return render(request, 'video.html', {'videos': [], 'error': 'No valid video IDs found in the database'})

    results = []

    for video in videos:
        video_id = video.video_id
        video_name = video.video_name  # Fetch video_name from the model
        url = f"https://dev.vdocipher.com/api/videos/{video_id}/otp"

        payload = json.dumps({"whitelisthref": "vdocipher.com"})
        headers = {
            'Authorization': "Apisecret oCxi0FTzAXOZxDPMddQcFZ3NQ3NpsIrtByd2fbghtwvdgwAcNsl0u3DhjN2VK3Al",
            'Content-Type': "application/json",
            'Accept': "application/json"
        }

        try:
            response = requests.post(url, data=payload, headers=headers)

            if response.status_code == 200:
                result = response.json()
                result['video_id'] = video_id  # Add video_id to the result
                result['video_name'] = video_name  # Add video_name to the result
                results.append(result)
            else:
                results.append({
                    "video_id": video_id,
                    "video_name": video_name,  # Add video_name even if there's an error
                    "error": response.text
                })

        except requests.exceptions.ProxyError as e:
            results.append({
                "video_id": video_id,
                "video_name": video_name,  # Add video_name to the error response
                "error": "ProxyError occurred",
                "details": str(e)
            })
        except Exception as e:
            results.append({
                "video_id": video_id,
                "video_name": video_name,  # Add video_name to the error response
                "error": "An error occurred",
                "details": str(e)
            })

    return render(request, 'video.html', {'videos': results, 'category': category})


def get_device_id(request):
    user_agent = request.META.get('HTTP_USER_AGENT', 'unknown')
    ip_address = request.META.get('REMOTE_ADDR', 'unknown')
    device_string = f"{user_agent}_{ip_address}"
    device_id = hashlib.md5(device_string.encode('utf-8')).hexdigest()
    return device_id


def get_device_name(user_agent):
    parsed_data = httpagentparser.detect(user_agent)
    os_info = parsed_data.get('os', {})
    browser_info = parsed_data.get('browser', {})
    device_name = os_info.get('name', 'Unknown OS')
    device_version = os_info.get('version', '')
    browser_name = browser_info.get('name', 'Unknown Browser')
    browser_version = browser_info.get('version', '')
    return f"{device_name} {device_version} - {browser_name} {browser_version}"


def login_view(request):
    if request.method == "POST":
        phone_number = request.POST.get('phone_number')
        password = request.POST.get('password')

        user = authenticate(username=phone_number, password=password)

        if user is not None:
            # Check user status
            if user.status != 'Active':
                return render(request, 'login.html',
                              {'error': "Siz bloklangansiz sababi siz ko'p qurilmalardan kirishga urindingiz."})

            # Bypass device limit for superusers
            if not user.is_superuser:
                # Get device info
                device_id = get_device_id(request)
                user_agent = request.META.get('HTTP_USER_AGENT', 'unknown')
                device_name = get_device_name(user_agent)

                # Check if the device already exists for the user
                device = UserDevice.objects.filter(user=user, device_id=device_id).first()

                if device:
                    # Device exists, update the last login timestamp
                    device.last_login = timezone.now()
                    device.save()
                else:
                    # Check if the user already has two devices
                    devices = UserDevice.objects.filter(user=user)
                    if devices.count() >= 5:
                        # Block the user and log them out of all devices
                        user.status = 'Block'
                        user.save()

                        # Delete all devices (log out from all)
                        devices.delete()

                        logout(request)
                        return render(request, 'login.html', {
                            'error': "Siz bloklangansiz. Juda ko'p moslamalarda tizimga kirishga harakat qildingiz."})

                    # If less than 2 devices, save the new device
                    UserDevice.objects.create(user=user, device_id=device_id, device_name=device_name)

            # Log the user in (both regular users and superusers)
            login(request, user)
            return redirect('modul')
        else:
            context = {'error': "Telefon raqami yoki parol noto'g'ri kiritilgan."}
            return render(request, 'login.html', context)

    return render(request, 'login.html')


def sing_up_view(request):
    if request.method == "POST":
        phone_number = request.POST.get('phone_number')
        first_name = request.POST.get('first_name')
        password = request.POST.get('password')
        coupon_code = request.POST.get('code')

        if not phone_number or not password:
            return render(request, 'sigup.html', {"error": "Telefon raqami va parol talab qilinadi."})

        phone_validator = RegexValidator(
            regex=r'^\+998\d{9}$',
            message='Invalid phone number. Format should be +998XXXXXXXXX',
            code='invalid_number'
        )

        try:
            phone_validator(phone_number)

            # Check if coupon code is valid
            if coupon_code:
                try:
                    coupon = Coupon.objects.get(coupon=coupon_code)
                    if coupon.is_active:
                        coupon.is_active = False
                        coupon.save()
                    else:
                        return render(request, 'sigup.html', {'error': 'Bu kupon allaqachon ishlatilgan.'})
                except Coupon.DoesNotExist:
                    return render(request, 'sigup.html', {'error': 'Kupon kodi yaroqsiz.'})

            # Create the user
            user = User(username=first_name, phone_number=phone_number)
            user.set_password(password)
            user.save()

            # Get device info
            device_id = get_device_id(request)
            user_agent = request.META.get('HTTP_USER_AGENT', 'unknown')
            device_name = get_device_name(user_agent)

            # Save the device info
            UserDevice.objects.create(user=user, device_id=device_id, device_name=device_name)

            # Log the user in
            login(request, user)
            return redirect('modul')

        except ValidationError:
            return render(request, 'sigup.html', {'error': 'Telefon raqamni +998XXXXXXXXX shu formatda kiriting'})
        except IntegrityError:
            return render(request, 'sigup.html', {'error': 'Bu telefon raqami allaqachon roʻyxatdan oʻtgan.'})
        except Exception as e:
            return render(request, 'sigup.html', {'error': str(e)})

    return render(request, 'sigup.html')


def user_logout(request):
    logout(request)
    return redirect('login')


def modul(request):
    if not request.user.is_authenticated:
        return redirect('login')
    if request.user.status == 'Block':
        logout(request)
        return redirect('login')
    return render(request, 'modul.html')