from django.urls import path
from .views import SignupView, MyTokenObtainPairView, UpdateUserProfile, CheckSessionView

urlpatterns = [
    path('signup/', SignupView.as_view()),
    path('token/', MyTokenObtainPairView.as_view()),
    path('update/', UpdateUserProfile.as_view()),
    path('check-session/', CheckSessionView.as_view()),
]