# Generated by Django 4.2.9 on 2024-10-02 12:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0005_userdevice_device_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='userdevice',
            name='ip_address',
            field=models.GenericIPAddressField(blank=True, null=True),
        ),
    ]
