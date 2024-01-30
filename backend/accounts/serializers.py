from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import UserAccount  
from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['name'] = user.get_full_name()
        token['email'] = user.email

        return token

    def validate(self, attrs):
        data = super().validate(attrs)

        # Add additional user information
        data['name'] = self.user.get_full_name()  # using the get_full_name method
        data['email'] = self.user.email
        data['verified'] = self.user.is_verified

        return data
    

class UserAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['name']

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.save()
        return instance
