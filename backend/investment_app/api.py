import requests

def get_all_nearest_stations_with_lines(latitude, longitude, radius=1500):
    # TfL API endpoint for StopPoints
    url = "https://api.tfl.gov.uk/StopPoint"

    # Parameters for the API request
    params = {
        "lat": latitude,
        "lon": longitude,
        "stopTypes": "NaptanRailStation,NaptanMetroStation",  # Including both Rail and Metro stations
        "radius": radius,
        "returnLines": "true"  # Request to return lines information
        # Add your 'app_id' and 'app_key' here if required
    }

    # Make the request to the TfL API
    response = requests.get(url, params=params)

    # Initialize an empty list to store station names and their lines
    stations_with_lines = []

    # Check if the request was successful
    if response.status_code == 200:
        data = response.json()
        stop_points = data.get("stopPoints", [])
        
        # Extract the station names and their lines
        for stop_point in stop_points:  # Get all stations within the radius
            station_name = stop_point.get("commonName")
            lines = [line.get("name") for line in stop_point.get("lines", [])]
            stations_with_lines.append((station_name, lines))

    else:
        print("Failed to retrieve data: Status code", response.status_code)

    return stations_with_lines

# Example usage
nearest_stations_with_lines = get_all_nearest_stations_with_lines(51.55398900000, 0.15415300000)  # Coordinates for a location in London
for station, lines in nearest_stations_with_lines:
    print(f"Station: {station}, Lines: {', '.join(lines)}")
