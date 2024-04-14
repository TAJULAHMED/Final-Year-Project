from rest_framework import serializers
from .models import Listing, Favourite, Station, InvestmentPreference, School
import math

class StationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Station
        fields = ['name']

class ListingSerializer(serializers.ModelSerializer):
    nearby_stations = StationSerializer(many=True, read_only=True)

    class Meta:
        model = Listing
        fields = ('title', 'address', 'city', 'borough', 'price', 'listing_type', 'bedrooms', 'bathrooms', 'photo_main', 'slug', 'nearby_stations')

class SchoolSerializer(serializers.ModelSerializer):
    class Meta:
        model = School
        fields = ['name']

class ListingDetailSerializer(serializers.ModelSerializer):
    original_listing_person_email = serializers.SerializerMethodField()
    is_fav = serializers.SerializerMethodField()
    schools = serializers.SerializerMethodField()
    nearby_stations = StationSerializer(many=True, read_only=True)  # Include this to show nearby stations in detail view

    class Meta:
        model = Listing
        fields = '__all__'
        lookup_field = 'slug'

    def get_original_listing_person_email(self, obj):
        return obj.original_listing_person.email if obj.original_listing_person else None
    
    def get_is_fav(self, obj):
        user = self.context['request'].user
        return Favourite.objects.filter(listing=obj, user=user).exists()
    
    
    def get_schools(self, obj):
        max_distance_km = 1
        def haversine(lon1, lat1, lon2, lat2):
            R = 6371
            lon1, lat1, lon2, lat2 = map(math.radians, [lon1, lat1, lon2, lat2])
            dlon = lon2 - lon1 
            dlat = lat2 - lat1 
            a = math.sin(dlat/2)**2 + math.cos(lat1) * math.cos(lat2) * math.sin(dlon/2)**2
            c = 2 * math.asin(math.sqrt(a)) 
            distance = R * c
            return distance

        nearby_schools = []
        for school in School.objects.all():
            if school.latitude and school.longitude and obj.latitude and obj.longitude:
                distance = haversine(obj.longitude, obj.latitude, school.longitude, school.latitude)
                if distance <= max_distance_km:
                    nearby_schools.append(school)
                    
        serializer = SchoolSerializer(nearby_schools, many=True)
        return serializer.data

    


class FavouriteItemSerializer(serializers.ModelSerializer):
    listing_details = ListingSerializer(source='listing')

    class Meta:
        model = Favourite
        fields = '__all__'

class NewFavSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favourite
        fields = ['listing']

class InvestmentPreferenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = InvestmentPreference
        fields = ['age', 'deposit', 'annual_income', 'radius', 'postcode']
