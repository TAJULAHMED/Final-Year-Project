import random
import string
from rest_framework import permissions
from rest_framework.views import APIView
from .models import Contact, VerifyContact
from django.core.mail import send_mail
from rest_framework.response import Response

class ContactCreateView(APIView):
    """
    API to create a new contact message and send emails
    """
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        """
        This is a test API to test emails, so no emails are sent to random people
        """
        data = self.request.data
        print(data)

        try:
            send_mail(
                data['subject'],
                'Name: ' + data['name']
                + '\nEmail: ' + data['email']
                + '\n\nmessage:\n'
                + data['message'], 
                'realestateinvestmentapp@gmail.com',
                ['realestateinvestmentapp@gmail.com', 'tajulahmed96@gmail.com'],
                fail_silently=False
            )

            contact = Contact(name=data['name'], email=data['email'], subject=data['subject'], message=data['message'])
            contact.save()

            return Response({'success': 'Message sent successfully'})

        except Exception:
            return Response({'error': 'Message failed to send'})


class ContactEnquireSellerView(APIView):
    """
    API for a user to enquire to a seller about a listing 
    """

    def post(self, request, format=None):
        """
        Sends an email to the seller with the enquiry and saves the enquiry in the database
        """
        data = self.request.data
        print(data)
        try:
            send_mail(
                data['subject'],
                'From: ' + data['name']
                + '\nEmail: ' + data['email']
                + '\n\n'
                + data['message'], 
                'realestateinvestmentapp@gmail.com',
                [data['email'], data['seller_email']],
                fail_silently=False
            )

            contact = Contact(name=data['name'], email=data['email'], subject=data['subject'], message=data['message'])
            contact.save()

            return Response({'success': 'Message sent successfully'})

        except Exception as e:
            print(e)
            return Response({'error': 'Message failed to send'})
        
class ContactCreateCodeView(APIView):
    """
    API to create and send a verification code to the users email
    """

    def post(self, request):
        """
        Creates a verification code using characters and digits and sends it to the users email
        """
        try:
            print(request.user)
            VerifyContact.objects.filter(user=request.user).delete()
            characters = string.ascii_letters + string.digits
            code = ''.join(random.choice(characters) for i in range(7))
            verify = VerifyContact(user=request.user, code=code)
            verify.save()

            send_mail(
                'Verification Code',
                code, 
                'realestateinvestmentapp@gmail.com',
                [request.user],
                fail_silently=False
            )


            return Response({'message': 'successfully created code'})
        except:
            return Response({'error': 'error creating code'})
        
class ContactVerifyCodeView(APIView):
    """
    API to verify a user if they give the correct code
    """

    def post(self, request):
        """
        Verifies the user if the code they give is the same as the one they were sent
        """
        try:
            request_code = request.data['code']

            verify_contact = VerifyContact.objects.filter(user=request.user).first()

            if verify_contact and verify_contact.code == request_code:
                request.user.is_verified = True
                request.user.save()

                verify_contact.delete()

                return Response({'message': 'User successfully verified.', 'verified': True})
            else:
                return Response({'error': 'Invalid or expired verification code.', 'verified': False}, status=400)

        
        except:
            return Response({'error': 'error verifying code', 'verified': False})

