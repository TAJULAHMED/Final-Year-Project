from rest_framework import serializers
from .models import Listing, Favourite, Station

class StationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Station
        fields = ['name']

class ListingSerializer(serializers.ModelSerializer):
    nearby_stations = StationSerializer(many=True, read_only=True)

    class Meta:
        model = Listing
        fields = ('title', 'address', 'city', 'borough', 'price', 'listing_type', 'bedrooms', 'bathrooms', 'photo_main', 'slug', 'nearby_stations')

class ListingDetailSerializer(serializers.ModelSerializer):
    original_listing_person_email = serializers.SerializerMethodField()
    is_fav = serializers.SerializerMethodField()
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

class FavouriteItemSerializer(serializers.ModelSerializer):
    listing_details = ListingSerializer(source='listing')

    class Meta:
        model = Favourite
        fields = '__all__'

class NewFavSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favourite
        fields = ['listing']
