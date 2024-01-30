from django.urls import path
from .views import ContactCreateView, ContactEnquireSellerView, ContactCreateCodeView, ContactVerifyCodeView

urlpatterns = [
    path('', ContactCreateView.as_view()),
    path('enquire/', ContactEnquireSellerView.as_view()),
    path('createcode/', ContactCreateCodeView.as_view()),
    path('verifycode/', ContactVerifyCodeView.as_view())
]