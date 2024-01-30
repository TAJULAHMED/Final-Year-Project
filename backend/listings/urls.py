from django.urls import path
from .views import ListingView, ListingsView, SearchView, FavView, NewListingView

urlpatterns = [
    path('', ListingsView.as_view()),
    path('search/', SearchView.as_view()),
    path('favs/', FavView.as_view()),
    path('newlisting/', NewListingView.as_view()),
    path('<slug>/', ListingView.as_view())
]