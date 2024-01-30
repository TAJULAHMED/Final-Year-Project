from django.urls import path
from .views import SignupView, MyTokenObtainPairView, UpdateUserProfile

urlpatterns = [
    path('signup/', SignupView.as_view()),
    path('token/', MyTokenObtainPairView.as_view()),
    path('update/', UpdateUserProfile.as_view()),
]