from django.urls import path
from .views import *


urlpatterns = [
    path('', login_view, name='login'),
    path('signup/', sing_up_view, name='signup'),
    path('logout/', logout, name='logout'),
    path('lesson/<str:category>/', video_list, name='lesson'),
    path('modul/', modul, name='modul'),
]
