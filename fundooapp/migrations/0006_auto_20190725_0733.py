# Generated by Django 2.2.3 on 2019-07-25 07:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fundooapp', '0005_auto_20190725_0727'),
    ]

    operations = [
        migrations.AlterField(
            model_name='notes',
            name='is_Trash',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='notes',
            name='is_archive',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='notes',
            name='is_pinned',
            field=models.BooleanField(default=False),
        ),
    ]