# Generated by Django 4.2.6 on 2024-01-19 13:59

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('realtors', '0012_alter_realtor_date_hired'),
    ]

    operations = [
        migrations.AlterField(
            model_name='realtor',
            name='date_hired',
            field=models.DateTimeField(blank=True, default=datetime.datetime(2024, 1, 19, 13, 59, 14, 928924)),
        ),
    ]
