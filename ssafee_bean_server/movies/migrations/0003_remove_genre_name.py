# Generated by Django 3.2.9 on 2021-11-17 05:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('movies', '0002_auto_20211117_1410'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='genre',
            name='name',
        ),
    ]