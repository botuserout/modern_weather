from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

API_KEY = "Enter your api key here"

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/weather", methods=["POST"])
def get_weather():
    city = request.form["city"]
    base_url = "https://api.openweathermap.org/data/2.5/weather"
    forecast_url = "https://api.openweathermap.org/data/2.5/forecast"
    weatherapi_key = "Enter your api key here"
    weatherapi_base = "https://api.weatherapi.com/v1/current.json"
    weatherapi_forecast = "https://api.weatherapi.com/v1/forecast.json"

    # Query OpenWeatherMap
    weather_res = requests.get(base_url, params={"q": city, "appid": API_KEY, "units": "metric"})
    forecast_res = requests.get(forecast_url, params={"q": city, "appid": API_KEY, "units": "metric"})

    # Query WeatherAPI
    weatherapi_res = requests.get(weatherapi_base, params={"key": weatherapi_key, "q": city, "aqi": "no"})
    weatherapi_forecast_res = requests.get(weatherapi_forecast, params={"key": weatherapi_key, "q": city, "days": 7, "aqi": "no", "alerts": "no"})

    # Prefer OpenWeatherMap, but merge or fallback to WeatherAPI if needed
    if weather_res.status_code == 200:
        weather = weather_res.json()
        forecast = forecast_res.json()
        weatherapi_data = weatherapi_res.json() if weatherapi_res.status_code == 200 else None
        weatherapi_forecast_data = weatherapi_forecast_res.json() if weatherapi_forecast_res.status_code == 200 else None
        return jsonify({
            "current": weather,
            "forecast": forecast,
            "weatherapi_current": weatherapi_data,
            "weatherapi_forecast": weatherapi_forecast_data
        })
    elif weatherapi_res.status_code == 200:
        # Fallback to WeatherAPI only
        weatherapi_data = weatherapi_res.json()
        weatherapi_forecast_data = weatherapi_forecast_res.json() if weatherapi_forecast_res.status_code == 200 else None
        return jsonify({
            "current": None,
            "forecast": None,
            "weatherapi_current": weatherapi_data,
            "weatherapi_forecast": weatherapi_forecast_data
        })
    else:
        return jsonify({"error": "City not found"}), 404

if __name__ == "__main__":
    app.run(debug=True)
