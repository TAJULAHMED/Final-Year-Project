from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import r2_score, mean_squared_error
from datetime import datetime, timedelta
lr = LinearRegression()

import pandas as pd
import math
import os

def manipulate_csv(new_data):
    dir_path = os.path.dirname(os.path.realpath(__file__))
    file_path = os.path.join(dir_path, 'df.csv')
    df = pd.read_csv(file_path)

    lat = new_data['Latitude'][0]
    lon = new_data['Longitude'][0]

    mile_in_degree_lat = 0.75 / 69
    mile_in_degree_lon = 0.75 / (69 * math.cos(math.radians(lat)))

    print('\n\n\n')
    print(lat, lon)


    lat_upper_bound = float(lat) + mile_in_degree_lat
    lat_lower_bound = float(lat) - mile_in_degree_lat
    lon_upper_bound = float(lon) + mile_in_degree_lon
    lon_lower_bound = float(lon) - mile_in_degree_lon
    
    # Filter out rows where the price is greater than 5,000,000
    df = df[(df['Latitude'] >= lat_lower_bound) & (df['Latitude'] <= lat_upper_bound) &
                    (df['Longitude'] >= lon_lower_bound) & (df['Longitude'] <= lon_upper_bound)]
    if new_data['Type_Detached'][0] == 1:
        type_of_house = 'Type_Detached'
    elif new_data['Type_Flat'][0] == 1:
        type_of_house = 'Type_Flat'
    elif new_data['Type_Terraced'][0] == 1:
        type_of_house = 'Type_Terraced'
    else:
        type_of_house = 'Type_Semi Detached'


    df = df[(df[type_of_house] == 1)]  

    return df

def prediction(new_data, df):
    # Convert new_data to DataFrame

    new_data['Days Since Sale'] = [(datetime.now() - datetime(1995, 1, 1)).days]
    new_data_df = pd.DataFrame(new_data)

    # Prepare the training data
    X = df.drop(columns=['Price'])
    y = df['Price']

    # Splitting the data into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=0)

    # Training the model
    lr.fit(X_train, y_train)


    forecast = {}

    for x in range(11):
        year = datetime.now().year + x
        new_data_df['Days Since Sale'] = new_data_df['Days Since Sale'] + (x*365)
        forecast[year] = lr.predict(new_data_df)[0]


    # Optional: Evaluate the model
    y_pred = lr.predict(X_test)
    r2 = r2_score(y_test, y_pred)
    mse = mean_squared_error(y_test, y_pred)

    print(f"r2 score: {r2}, mse score: {mse}")


    # Returning the prediction
    return forecast




new_house_data = {
    'Interest Rate': [5],         # Replace with the actual interest rate value
    'Latitude': [51.536554],                   # Replace with the actual latitude value
    'Longitude': [0.093429],                 # Replace with the actual longitude value
    'Type_Detached': [0],         # 1 if Detached, 0 otherwise
    'Type_Flat': [0],                 # 1 if Flat, 0 otherwise
    'Type_Semi Detached': [0], # 1 if Semi Detached, 0 otherwise
    'Type_Terraced': [1],         # 1 if Terraced, 0 otherwise
}

def make_prediction(new_house_data):
    return prediction(new_house_data, manipulate_csv(new_house_data))

#filtered_df = manipulate_csv(new_house_data)
#predicted_price = prediction(new_house_data, filtered_df)
#print("Predicted Price:", predicted_price)
print(make_prediction(new_house_data))