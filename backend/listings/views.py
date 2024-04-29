from decimal import ROUND_HALF_UP, Decimal
import re, requests, math
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework import permissions
from .models import Listing, Favourite, Station, Line, InvestmentPreference
from .serializers import InvestmentPreferenceSerializer, ListingSerializer, ListingDetailSerializer, NewFavSerializer, FavouriteItemSerializer
from datetime import datetime, timezone, timedelta
from django.utils import timezone as django_timezone
from rest_framework import status
from realtors.models import Realtor
from rest_framework.pagination import PageNumberPagination
from .ml.pred import make_prediction


class FavView(APIView):
    """
    API to handle user favorites allowing for listing and removal of favorites
    """
    def get(self, request):
        queryset = Favourite.objects.filter(user=request.user)
        serializer = FavouriteItemSerializer(queryset, many=True)
        print(serializer.data, request.user)
        
        return Response(serializer.data) 
    
    def post(self, request):
        serializer = NewFavSerializer(data=request.data) 

        already_fav = Favourite.objects.filter(user=request.user, listing_id=request.data['listing'])
        if serializer.is_valid():
            if already_fav.exists():
                already_fav.delete()
                return Response({'message': 'Removed successfully'})
            serializer.save(user=request.user)
            return Response({'message': 'success'})
        else:
            return Response({'error': 'not success'})




class ListingsView(ListAPIView):
    """
    API to list all published listings with pagination
    """
    queryset = Listing.objects.order_by('-list_date').filter(is_published=True)
    permission_classes = (permissions.AllowAny, ) # if error put comma after parameter
    serializer_class = ListingSerializer
    pagination_class = PageNumberPagination
    lookup_field = 'slug'

class ListingView(RetrieveAPIView):
    """
    API to retrieve a a single listing based on its slug
    """
    queryset = Listing.objects.order_by('-list_date').filter(is_published=True)
    serializer_class = ListingDetailSerializer
    lookup_field = 'slug'

    def get_serializer_context(self):
        return {'request': self.request}

class SearchView(APIView):
    """
    API  to search listings based on various filters like type, price, etc.
    """
    permission_classes = (permissions.AllowAny, )
    serializer_class = ListingSerializer

    def post(self, request, format=None):
        queryset = Listing.objects.order_by('-list_date').filter(is_published=True)
        data = self.request.data
        print(data)

        listing_type = data['listing_type']
        queryset = queryset.filter(listing_type__iexact=listing_type)

        price = data['price']
        if price == '0':
            price = 0
        elif price == '200000':
            price = 200000
        elif price == '400000':
            price = 400000
        elif price == '600000':
            price = 600000
        elif price == '800000':
            price = 800000
        elif price == '1000000':
            price = 1000000
        elif price == '1500000':
            price = 1500000
        elif price == 'any':
            price = -1
        
        if price != -1:
            queryset = queryset.filter(price__gte=price)
        
        bedrooms = data['bedrooms']
        print(bedrooms)
        if bedrooms == '0+':
            bedrooms = 0
        elif bedrooms == '1+':
            bedrooms = 1
        elif bedrooms == '2+':
            bedrooms = 2
        elif bedrooms == '3+':
            bedrooms = 3
        elif bedrooms == '4+':
            bedrooms = 4
        elif bedrooms == '5+':
            bedrooms = 5
        
        queryset = queryset.filter(bedrooms__gte=bedrooms)

        bathrooms = data['bathrooms']
        if bathrooms == '0+':
            bathrooms = 0.0
        elif bathrooms == '1+':
            bathrooms = 1.0
        elif bathrooms == '2+':
            bathrooms = 2.0
        elif bathrooms == '3+':
            bathrooms = 3.0
        elif bathrooms == '4+':
            bathrooms = 4.0

        queryset = queryset.filter(bathrooms__gte=bathrooms)

        days_passed = data['days_listed']
        if days_passed == '1 or less':
            days_passed = 1
        elif days_passed == '2 or less':
            days_passed = 2
        elif days_passed == '5 or less':
            days_passed = 5
        elif days_passed == '10 or less':
            days_passed = 10
        elif days_passed == '20 or less':
            days_passed = 20
        elif days_passed == 'any':
            days_passed = 0

        for query in queryset:
            list_date_datetime = datetime.combine(query.list_date, datetime.min.time(), tzinfo=django_timezone.utc)
            num_days = (datetime.now(timezone.utc) - list_date_datetime).days

            if days_passed != 0:
                if num_days > days_passed:
                    slug = query.slug
                    queryset = queryset.exclude(slug__iexact=slug)
        

        has_photos = data['has_photos']
        if has_photos == '1':
            has_photos = 1
        elif has_photos == '3':
            has_photos = 3
        elif has_photos == '5':
            has_photos = 5
        elif has_photos == '10':
            has_photos = 10
        elif has_photos == '15':
            has_photos = 15
        
        for query in queryset:
            count = 0
            if query.photo_1:
                count += 1
            if query.photo_2:
                count += 1
            if query.photo_3:
                count += 1
            if query.photo_4:
                count += 1
            if query.photo_5:
                count += 1
            if query.photo_6:
                count += 1
            if query.photo_7:
                count += 1
            if query.photo_8:
                count += 1
            if query.photo_9:
                count += 1
            if query.photo_10:
                count += 1
            if query.photo_11:
                count += 1
            if query.photo_12:
                count += 1
            if query.photo_13:
                count += 1
            if query.photo_14:
                count += 1
            if query.photo_15:
                count += 1

            print(count, has_photos)
            
            if count < has_photos:
                slug = query.slug
                queryset = queryset.exclude(slug__iexact=slug)
        
        open_house = data['open_house']
        if isinstance(open_house, str):
            open_house = open_house.lower() == 'true'
        queryset = queryset.filter(open_house=open_house)

        keywords = data['keywords']
        queryset = queryset.filter(description__icontains=keywords)

        serializer = ListingSerializer(queryset, many=True)
        
        return Response(serializer.data) 


class NewListingView(APIView):
    """
    API to create a new listing with geolocation data 
    """
    def post(self, request):
        print(request.data)

        data = request.data
        slug = re.sub(r'\s+', '-', data.get('address', '')).lower()
        
        
        postcode = data.get('postcode')
        if postcode:
            api_url = f'http://api.postcodes.io/postcodes/{postcode}'
            response = requests.get(api_url)
            if response.status_code == 200:
                result = response.json().get('result', {})
                longitude = Decimal(result.get('longitude', 0)).quantize(Decimal('.00000000001'), rounding=ROUND_HALF_UP)
                latitude = Decimal(result.get('latitude', 0)).quantize(Decimal('.00000000001'), rounding=ROUND_HALF_UP)
                admin_district = result.get('admin_district')
                admin_ward = result.get('admin_ward')
                print(longitude, latitude, admin_district, admin_ward)
            else:
                return Response({'error': 'Invalid postcode or API error'}, status=status.HTTP_400_BAD_REQUEST)


        if longitude and latitude:
            new_house_data = {
                'Interest Rate': [5],      
                'Latitude': [latitude],   
                'Longitude': [longitude],   
                'Type_Detached': [0],     
                'Type_Flat': [0],         
                'Type_Semi Detached': [0],
                'Type_Terraced': [0],      
            }

            listing_type=data.get('listingType')
            if listing_type == 'Terraced':
                new_house_data['Type_Terraced'] = [1]
            elif listing_type == 'Semi Detatched':
                new_house_data['Type_Semi Detached'] = [1]
            elif listing_type == 'Detatched':
                new_house_data['Type_Detached'] = [1]
            elif listing_type == 'Flat':
                new_house_data['Type_Flat'] = [1]

            pred = make_prediction(new_house_data)

        
        print('this is open house', data.get('open_house'))
        print(type(data.get('open_house')))
        
        open_house_value = data.get('open_house', 'false')
        if open_house_value == 'true':
            open_house_bool = True
        else:
            open_house_bool = False


        listing = Listing(
            original_listing_person=request.user,
            realtor=Realtor.objects.get(id=1),
            slug=slug,
            title=data.get('address'),
            address=data.get('address'),
            city=data.get('city'),
            borough=admin_district,
            postcode=data.get('postcode'),
            description=data.get('description'),
            listing_type=data.get('listingType'),
            price=data.get('price'),
            bedrooms=data.get('bedrooms'),
            bathrooms=data.get('bathrooms'),
            open_house=open_house_bool,
            longitude=longitude,
            latitude=latitude,
            pred_prices = pred,
        )

        photo_fields = ['photo_main', 'photo_1', 'photo_2', 'photo_3', 'photo_4', 'photo_5', 'photo_6', 'photo_7', 'photo_8', 'photo_9', 'photo_10', 'photo_11', 'photo_12', 'photo_13', 'photo_14', 'photo_15']
        for field in photo_fields:
            if field in data:
                photo = data[field]
                if hasattr(photo, 'read'):
                    setattr(listing, field, photo)

        try:
            listing.full_clean()
            listing.save()
            self.add_stations_to_listing(listing, latitude, longitude)
            return Response({'message': 'Listing created successfully!'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            print(e)
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
    def add_stations_to_listing(self, listing, latitude, longitude):
        stations_data = self.get_all_nearest_stations_with_lines(latitude, longitude)


        for station_name, line_names in stations_data:
            station, created = Station.objects.get_or_create(name=station_name)

            for line_name in line_names:
                line, _ = Line.objects.get_or_create(name=line_name)
                station.lines.add(line)

            listing.nearby_stations.add(station)

        print("Linked stations count:", listing.nearby_stations.count())  

    
    def get_all_nearest_stations_with_lines(self, latitude, longitude, radius=1500):
        url = "https://api.tfl.gov.uk/StopPoint"
        params = {
            "lat": latitude,
            "lon": longitude,
            "stopTypes": "NaptanRailStation,NaptanMetroStation",
            "radius": radius,
            "returnLines": "true"
        }
        response = requests.get(url, params=params)
        stations_with_lines = []
        if response.status_code == 200:
            data = response.json()
            stop_points = data.get("stopPoints", [])
            for stop_point in stop_points:
                station_name = stop_point.get("commonName")
                lines = [line.get("name") for line in stop_point.get("lines", [])]
                stations_with_lines.append((station_name, lines))
        else:
            print("Failed to retrieve data: Status code", response.status_code)
        return stations_with_lines


def get_bounding_box(latitude, longitude, radius):
    """
    Calculate a bounding box around a point (latitude, longitude) within a given radius in miles
    """

    # Constants
    miles_per_degree = Decimal('69.0')

    # Calculate radians over the distance
    radius_in_degrees = Decimal(radius) / miles_per_degree

    # Convert latitude to Decimal for calculation
    latitude = Decimal(latitude)
    longitude = Decimal(longitude)

    # Latitude: 1 degree = approx 69 miles
    lat_min = latitude - radius_in_degrees
    lat_max = latitude + radius_in_degrees

    # Longitude: varies based on latitude
    lon_min = longitude - radius_in_degrees / Decimal(math.cos(math.radians(float(latitude))))
    lon_max = longitude + radius_in_degrees / Decimal(math.cos(math.radians(float(latitude))))

    return (lat_min, lat_max, lon_min, lon_max)

class PreferenceListings(APIView):
    """
    API to list listings based on userss investment preferences
    """
    def get(self, request):
        
        user = request.user
        try:
            preferences = InvestmentPreference.objects.get(user=user)
        except InvestmentPreference.DoesNotExist:
            return Response({'message': 'Investment preferences not found.'}, status=status.HTTP_404_NOT_FOUND)

        affordable_price = preferences.deposit + (preferences.annual_income * 5)
        lat_min, lat_max, lon_min, lon_max = get_bounding_box(preferences.latitude, preferences.longitude, preferences.radius)
        listings = Listing.objects.filter(
            latitude__gte=lat_min,
            latitude__lte=lat_max,
            longitude__gte=lon_min,
            longitude__lte=lon_max,
            price__lte=affordable_price,
        )

        serializer = ListingSerializer(listings, many=True)
        return Response(serializer.data)


class PreferenceView(APIView): 
    """
    API to manage users investment preferences
    """
    def get(self, request):
        user = request.user
        try:
            preference = InvestmentPreference.objects.get(user=user)
            serializer = InvestmentPreferenceSerializer(preference)
            return Response(serializer.data)
        except InvestmentPreference.DoesNotExist:
            return Response({'message': 'No investment preferences found for the user.'}, status=status.HTTP_404_NOT_FOUND)


    def post(self, request):
        user = request.user
        data = request.data

        print(data)

        postcode = data['postcode']
        longitude = 51.5235  
        latitude = 0.0330

        if postcode:
            api_url = f'http://api.postcodes.io/postcodes/{postcode}'
            response = requests.get(api_url)
            if response.status_code == 200:
                result = response.json().get('result', {})
                longitude = Decimal(result.get('longitude')).quantize(Decimal('.00000000001'), rounding=ROUND_HALF_UP)
                latitude = Decimal(result.get('latitude')).quantize(Decimal('.00000000001'), rounding=ROUND_HALF_UP)
            else:
                return Response({'error': 'Invalid postcode or API error'}, status=status.HTTP_400_BAD_REQUEST)

        for key in data:
            if data[key] == '':
                return Response({'error': 'Fill in all the fields'}, status=status.HTTP_400_BAD_REQUEST)

        preference, created = InvestmentPreference.objects.get_or_create(
        user=user,
        defaults={
            'deposit': data.get('deposit', 0),  
            'annual_income': data.get('annual_income', 0),
            'longitude': longitude,
            'latitude': latitude,
            'radius': data.get('radius', 0)
        }
    )

        serializer = InvestmentPreferenceSerializer(preference, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'success': 'Successfully updated preferences'})
        else:
            return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)



class UserListingsView(APIView):
    """
    API to manage listings created by the user
    """
    def get(self, request):
        listings = Listing.objects.filter(original_listing_person=request.user)
        serializer = ListingSerializer(listings, many=True)
        return Response(serializer.data)

    def post(self, request):
        data = request.data
        print(request.data)
        if data['slug'] is None:
            return Response({"error": "Error deleting"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
       
        try:  
            listing = Listing.objects.get(slug=data['slug'], original_listing_person=request.user)
        except:
            return Response({'error': 'Listing not found'}, status=status.HTTP_404_NOT_FOUND)

        listing.delete()
        listings = Listing.objects.filter(original_listing_person=request.user)
        serializer = ListingSerializer(listings, many=True)
        return Response(serializer.data)
