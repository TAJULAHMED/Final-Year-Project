from django.urls import path
from .views import RealtorListView, RealtorView

urlpatterns = [
    path('', RealtorListView.as_view()),
    path('<pk>/', RealtorView.as_view())

]