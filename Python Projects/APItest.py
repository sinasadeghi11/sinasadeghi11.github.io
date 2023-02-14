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
