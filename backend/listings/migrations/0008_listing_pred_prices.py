# Generated by Django 4.2.6 on 2024-01-28 13:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('listings', '0007_line_station_listing_nearby_stations'),
    ]

    operations = [
        migrations.AddField(
            model_name='listing',
            name='pred_prices',
            field=models.JSONField(blank=True, null=True),
        ),
    ]
