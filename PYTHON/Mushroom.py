# -*- coding: utf-8 -*-
"""
Created on Mon Feb 13 21:58:39 2023

@author: sinas

"""

"""
import requests

# Start a session
session = requests.Session()

# Set the API endpoint URL
url = "http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=4c68fbeea987478cb9497e249bc35f6c"

# Get the weather data from the API
response = session.get(url, timeout=30)

# Check if the request was successful
if response.status_code == 200:
    # Parse the JSON response data
    data = response.json()

    # Print the current temperature in Celsius
    temperature = data["main"]["temp"] - 273.15
    print(f"The current temperature in London is {temperature:.2f}°C")
else:
    # Print an error message if the request failed
    print("Failed to get weather data")

# Close the session
session.close()

"""

import requests
import datetime

# Set the ideal temperature and humidity ranges for Psilocybe cubensis
ideal_temperature_day = range(70, 81)  # °F
ideal_temperature_night = range(60, 71)  # °F
ideal_humidity = range(90, 96)  # %

# Start a session
session = requests.Session()

# Set the API endpoint URL to retrieve historical weather data for the past 14 days
api_key = "533a8deb31884b09810a98058f6297e7"
latitude = 19.7669
longitude = -70.5158
start_date_str = "2022-02-01"
end_date_str = "2022-02-14"
url = f"https://api.weatherbit.io/v2.0/history/daily?lat={latitude}&lon={longitude}&start_date={start_date_str}&end_date={end_date_str}&key={api_key}"

# Get the weather data from the API
try:
    response = session.get(url, timeout=30)
except requests.exceptions.RequestException as e:
    print("Error retrieving weather data:", e)
    session.close()
    exit()

# Check if the request was successful
if response.status_code == 200:
    # Parse the JSON response data
    data = response.json()
    
    # Extract the weather data for each day of the past 14 days
    daily_data = data["data"]
    num_ideal_days = 0
    for day in daily_data:
        temperature_day = day["temp"]  # Daily average temperature in °C
        temperature_night = day["temp"]  # Daily average temperature in °C
        humidity = day["rh"]  # Daily average relative humidity in %
        
        # Check if the temperature and humidity are within the ideal ranges
        if temperature_day in ideal_temperature_day and temperature_night in ideal_temperature_night and humidity in ideal_humidity:
            num_ideal_days += 1
    
    # Calculate the % chance of Psilocybe cubensis growing based on the number of ideal days
    chance_of_growth = (num_ideal_days / 14) * 100  # Assuming 14 days of historical data
    
    # Print the % chance of Psilocybe cubensis growing
    print(f"The % chance of Psilocybe cubensis growing is {chance_of_growth}%")
else:
    # Print an error message if the request failed
    print(response.status_code)

# Close the session
session.close()
