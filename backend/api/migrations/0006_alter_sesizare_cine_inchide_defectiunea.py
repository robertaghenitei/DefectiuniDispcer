# Generated by Django 5.1.5 on 2025-02-24 17:42

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0005_alter_sesizare_cine_inchide_defectiunea"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AlterField(
            model_name="sesizare",
            name="cine_inchide_defectiunea",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="rezolvatSector",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
    ]
