from django.contrib import admin
from .models import Listing, Favourite, Station, Line, InvestmentPreference

class ListingAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'is_published', 'price', 'list_date', 'realtor')
    list_display_links = ('id', 'title')
    list_filter = ('realtor', )
    list_editable = ('is_published', )
    search_fields = ('title', 'description', 'address', 'city', 'borough', 'postcode', 'price')
    list_per_page = 25

admin.site.register(Listing, ListingAdmin)
admin.site.register(Favourite)
admin.site.register(Station)
admin.site.register(Line)
admin.site.register(InvestmentPreference)