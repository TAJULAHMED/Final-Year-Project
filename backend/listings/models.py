from django.db import models
from django.utils.timezone import now
from realtors.models import Realtor
from django.contrib.auth import get_user_model

User = get_user_model()

class Line(models.Model):
    name = models.CharField(max_length=200, unique=True)

    def __str__(self):
        return self.name
    

class Station(models.Model):
    name = models.CharField(max_length=200)
    lines = models.ManyToManyField(Line, related_name='stations')

    def __str__(self):
        return self.name
    
class School(models.Model):
    name = models.CharField(max_length=200)
    longitude = models.DecimalField(max_digits=15, decimal_places=11, blank=True, null=True)
    latitude = models.DecimalField(max_digits=15, decimal_places=11, blank=True, null=True)

    def __str__(self):
        return self.name

class Listing(models.Model):
    class ListingType(models.TextChoices):
        TERRACED = 'Terraced'
        SEMI_DETATCHED = 'Semi Detatched'
        DETATCHED = 'Detatched'
        FLAT = 'Flat'
        UNDEFINED = 'Undefined'
    
    original_listing_person = models.ForeignKey(User, on_delete=models.CASCADE)

    realtor = models.ForeignKey(Realtor, on_delete=models.DO_NOTHING)
    slug = models.CharField(max_length=200, unique=True)
    title = models.CharField(max_length=250)
    address = models.CharField(max_length=150)
    city = models.CharField(max_length=100)
    borough = models.CharField(max_length=100)
    postcode = models.CharField(max_length=10)
    description = models.TextField(blank=True)
    listing_type = models.CharField(max_length=50, choices=ListingType.choices, default=ListingType.UNDEFINED)
    price = models.IntegerField()
    bedrooms = models.IntegerField()
    bathrooms = models.DecimalField(max_digits=2, decimal_places=1)
    open_house = models.BooleanField(default=False)
    photo_main = models.ImageField(upload_to='photos/%Y/%m/%d/')
    photo_1 = models.ImageField(upload_to='photos/%Y/%m/%d/', blank=True)
    photo_2 = models.ImageField(upload_to='photos/%Y/%m/%d/', blank=True)
    photo_3 = models.ImageField(upload_to='photos/%Y/%m/%d/', blank=True)
    photo_4 = models.ImageField(upload_to='photos/%Y/%m/%d/', blank=True)
    photo_5 = models.ImageField(upload_to='photos/%Y/%m/%d/', blank=True)
    photo_6 = models.ImageField(upload_to='photos/%Y/%m/%d/', blank=True)
    photo_7 = models.ImageField(upload_to='photos/%Y/%m/%d/', blank=True)
    photo_8 = models.ImageField(upload_to='photos/%Y/%m/%d/', blank=True)
    photo_9 = models.ImageField(upload_to='photos/%Y/%m/%d/', blank=True)
    photo_10 = models.ImageField(upload_to='photos/%Y/%m/%d/', blank=True)
    photo_11 = models.ImageField(upload_to='photos/%Y/%m/%d/', blank=True)
    photo_12 = models.ImageField(upload_to='photos/%Y/%m/%d/', blank=True)
    photo_13 = models.ImageField(upload_to='photos/%Y/%m/%d/', blank=True)
    photo_14 = models.ImageField(upload_to='photos/%Y/%m/%d/', blank=True)
    photo_15 = models.ImageField(upload_to='photos/%Y/%m/%d/', blank=True)
    is_published = models.BooleanField(default=True)
    list_date = models.DateField(default=now, blank=True)
    longitude = models.DecimalField(max_digits=15, decimal_places=11, blank=True, null=True)
    latitude = models.DecimalField(max_digits=15, decimal_places=11, blank=True, null=True)
    nearby_stations = models.ManyToManyField(Station, related_name='listings', blank=True)
    pred_prices = models.JSONField(blank=True, null=True)

    def __str__(self):
        return self.title


class Favourite(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    listing = models.ForeignKey(Listing, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.listing)
    

class InvestmentPreference(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    age = models.IntegerField()
    deposit = models.DecimalField(max_digits=15, decimal_places=2)
    annual_income = models.DecimalField(max_digits=15, decimal_places=2)
    postcode = models.CharField(max_length=10)
    longitude = models.DecimalField(max_digits=15, decimal_places=11)
    latitude = models.DecimalField(max_digits=15, decimal_places=11)
    radius = models.IntegerField()

    def __str__(self):
        return f"Investment preferences of {self.user.email}"

    



    

    