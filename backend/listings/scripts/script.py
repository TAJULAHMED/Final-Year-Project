import pandas as pd
from listings.models import School
from django.db import transaction


data = pd.read_csv(r'C:\Users\Tajul\Desktop\Final Year Project\backend\listings\scripts\schools.csv')

filtered_data = data[data['Ofsted region'] == 'London']

with transaction.atomic():
    for index, row in filtered_data.iterrows():
        school = School(
            name=row['School name'], 
            longitude=row['Longitude'],
            latitude=row['Latitude']
        )
        school.save()

#filtered_data.to_csv('FilteredSchools.csv', index=False)

