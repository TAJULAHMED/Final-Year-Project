from django.contrib.auth import get_user_model
User = get_user_model()
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import permissions, status
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import MyTokenObtainPairSerializer, UserAccountSerializer
from django.contrib.auth.hashers import check_password

class SignupView(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data
        name = data['name']
        email = data['email']
        password = data['password']
        password2 = data['password2']

        if password == password2:
            if User.objects.filter(email=email).exists():
                return Response({'error': 'Email already exists'})
            else:
                if len(password) < 6:
                    return Response({'error': 'Password needs to be longer than 6 characters'})
                else:
                    user = User.objects.create_user(email=email, password=password, name=name)
                    user.save()
                    return Response({'success': 'User created successfully'})
        else:
            return Response({'error': 'Passwords do not match'})
        
class UpdateUserProfile(APIView):
    def post(self, request):
        user = request.user
        data = request.data
        print(data)

        # Updating password
        if data['current_password'] != '' and  data['new_password'] != '':
            current_password = data['current_password']
            new_password = data['new_password']
            confirm_password = data.get('confirm_password', '')

            # Check if new password and confirm password match
            if new_password != confirm_password:
                return Response({'error': 'New password and confirm password do not match'}, status=status.HTTP_400_BAD_REQUEST)

            # Verify current password
            if not check_password(current_password, user.password):
                return Response({'error': 'Current password is incorrect'}, status=status.HTTP_400_BAD_REQUEST)

            # Validate new password length
            if len(new_password) < 6:
                return Response({'error': 'New password must be at least 6 characters long'}, status=status.HTTP_400_BAD_REQUEST)

            user.set_password(new_password)
            user.save()
            return Response({'success': 'Password updated successfully'})
        
        if 'name' in data:
            user.name = data['name']
            user.save()
            print(user)
            return Response({'success': 'Name changed successfully'}) 
        
        # Update other user information
        serializer = UserAccountSerializer(user, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'success': 'User profile updated successfully'})
        print('asdsa')
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer