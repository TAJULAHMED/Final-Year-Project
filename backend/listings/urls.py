from django.urls import path
from .views import ListingView, ListingsView, SearchView, FavView, NewListingView, PreferenceListings, PreferenceView, UserListingsView

urlpatterns = [
    path('', ListingsView.as_view()),
    path('search/', SearchView.as_view()),
    path('favs/', FavView.as_view()),
    path('newlisting/', NewListingView.as_view()),
    path('preflistings/', PreferenceListings.as_view()),
    path('preferences/', PreferenceView.as_view()),
    path('user-listings/', UserListingsView.as_view()),
    path('<slug>/', ListingView.as_view())
]