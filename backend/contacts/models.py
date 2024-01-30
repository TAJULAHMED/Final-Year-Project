from django.db import models
from datetime import datetime
from django.contrib.auth import get_user_model

User = get_user_model()

class Contact(models.Model):
    name = models.CharField(max_length=200)
    email = models.CharField(max_length=150)
    subject = models.CharField(max_length=100)
    message = models.TextField(blank=True)
    contact_date = models.DateTimeField(default=datetime.now, blank=True)

    def __str__(self):
        return self.name
    

class VerifyContact(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    code = models.CharField(max_length=7)

    def __str__(self):
        return str(self.user)