# Generated by Django 2.2.3 on 2019-08-23 10:23

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('notes', '0004_auto_20190823_0954'),
    ]

    operations = [
        migrations.AlterField(
            model_name='notes',
            name='collaborator',
            field=models.ManyToManyField(null=True, related_name='user_collaborator', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='notes',
            name='label',
            field=models.ManyToManyField(null=True, to='labels.Label'),
        ),
    ]