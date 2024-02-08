from django.contrib.auth import get_user_model
from rest_framework.authentication import BaseAuthentication
from rest_framework import exceptions
from rest_framework_simplejwt.tokens import UntypedToken
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError

class CookieJWTAuthentication(BaseAuthentication):
    def authenticate(self, request):
        raw_token = request.COOKIES.get('access_token')  
        if raw_token is None:
            return None  
        
        try:
            valid_data = UntypedToken(raw_token)
            user_id = valid_data['user_id']
        except (InvalidToken, TokenError) as e:
            raise exceptions.AuthenticationFailed('Invalid token') from e
        
        User = get_user_model() 
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            raise exceptions.AuthenticationFailed('User not found')

        return (user, None)
