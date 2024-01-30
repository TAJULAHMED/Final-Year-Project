from django.contrib import admin
from .models import Realtor

class RealtorAdmin(admin.ModelAdmin): 
    # the display in admin panel will be this e.g. 3 idk idk@idk.com Jan. 8, 2024, 2:12 p.m.
    list_display = ('id', 'name', 'email', 'date_hired')
    # the id and name are clickable links in the admin panel
    list_display_links = ('id', 'name')
    # can search by name in admin panel
    search_fields = ('name', )
    # how many per page in admin panel
    list_per_page = 25

admin.site.register(Realtor, RealtorAdmin)