# Generated by Django 4.2.6 on 2024-01-19 10:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('listings', '0005_listing_latitude_listing_longitude'),
    ]

    operations = [
        migrations.AlterField(
            model_name='listing',
            name='latitude',
            field=models.DecimalField(blank=True, decimal_places=11, max_digits=15, null=True),
        ),
        migrations.AlterField(
            model_name='listing',
            name='longitude',
            field=models.DecimalField(blank=True, decimal_places=11, max_digits=15, null=True),
        ),
    ]
