# Generated by Django 4.2.9 on 2024-10-02 12:33

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0006_userdevice_ip_address'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userdevice',
            name='ip_address',
        ),
    ]
