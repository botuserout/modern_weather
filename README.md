# 🌦️ Modern Weather Dashboard

A beautiful, modern weather dashboard built with Flask and JavaScript featuring glassmorphism design, real-time weather data, interactive forecasts, and theme customization.

![Modern Weather Dashboard](screenshot.png) <!-- Add your screenshot here -->

## ✨ Features

### 🎨 **Stunning UI/UX**
- **Glassmorphism Design** - Apple-inspired glass effects with depth, lighting, and reflections
- **Three Theme Modes** - Light, Dark, and Auto (system preference)
- **Responsive Layout** - Optimized for desktop, tablet, and mobile devices
- **Smooth Animations** - Fluid transitions and hover effects throughout

### 🌍 **Weather Functionality**
- **Real-time Weather Data** - Current conditions with OpenWeatherMap API
- **Multiple Forecast Views**
  - 24-Hour Forecast with hourly breakdown
  - 3-Day Forecast with day/night temperatures
  - 7-Day Extended Forecast
- **Interactive Map** - Leaflet.js integration showing location
- **Detailed Metrics** - Temperature, humidity, wind speed, pressure, visibility, UV index, and more

### ⚙️ **Personalization**
- **Live Clock** - Real-time clock with date display
- **Unit Conversion** - Switch between °C/°F, km/h/mph, hPa/inHg
- **Favorite Cities** - Save and quickly access your favorite locations
- **Geolocation** - Auto-detect current location
- **Contextual Greetings** - Dynamic messages based on time and weather

### 🎯 **Additional Features**
- **Quick City Search** - Popular cities accessible with one click
- **Weather Icons** - Custom local weather icons
- **Persistent Settings** - LocalStorage saves preferences
- **Error Handling** - Graceful fallbacks and user feedback

---

## 🛠️ Technologies Used

### **Backend**
- **Python 3.x**
- **Flask** - Web framework
- **Requests** - HTTP library for API calls

### **Frontend**
- **HTML5** - Semantic markup
- **CSS3** - Advanced styling with CSS variables
- **JavaScript (ES6+)** - Vanilla JS for interactivity
- **Leaflet.js** - Interactive maps
- **Chart.js** - Data visualization (optional)

### **APIs**
- **OpenWeatherMap API** - Weather data provider

### **Design**
- **Glassmorphism** - Modern UI design pattern
- **CSS Variables** - Dynamic theming
- **CSS Animations** - Smooth transitions

---

## 📋 Prerequisites

- Python 3.7 or higher
- OpenWeatherMap API Key (free tier available)
- Modern web browser (Chrome, Firefox, Safari, Edge)

---

## 🚀 Installation & Setup

### 1. **Clone the Repository**
```bash
git clone https://github.com/yourusername/modern-weather.git
cd modern-weather
```

### 2. **Create Virtual Environment** (Recommended)
```bash
python -m venv venv

# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate
```

### 3. **Install Dependencies**
```bash
pip install -r requirements.txt
```

### 4. **Get OpenWeatherMap API Key**
1. Sign up at [OpenWeatherMap](https://openweathermap.org/api)
2. Navigate to API Keys section
3. Generate a new API key (free tier available)

### 5. **Configure API Key**
Open `app.py` and replace the API key:
```python
API_KEY = "your_openweathermap_api_key_here"
```

**OR** use environment variables (recommended):
```bash
# Windows
set OPENWEATHER_API_KEY=your_api_key_here

# macOS/Linux
export OPENWEATHER_API_KEY=your_api_key_here
```

Then update `app.py`:
```python
import os
API_KEY = os.getenv('OPENWEATHER_API_KEY')
```

### 6. **Run the Application**
```bash
python app.py
```

### 7. **Access the Dashboard**
Open your browser and navigate to:
```
http://localhost:5000
```

---

## 📁 Project Structure

```
modern_weather/
│
├── app.py                  # Flask backend application
├── requirements.txt        # Python dependencies
├── README.md              # Project documentation
│
├── static/                # Static assets
│   ├── app.js            # Main JavaScript logic
│   ├── style.css         # Glassmorphism styles
│   │
│   ├── icons/            # Weather icons
│   │   ├── clear.png
│   │   ├── clouds.png
│   │   ├── rain.png
│   │   └── mist.png
│   │
│   └── libs/             # Third-party libraries
│       ├── leaflet.css
│       └── leaflet.js
│
└── templates/            # HTML templates
    └── index.html        # Main dashboard page
```

---

## 🔧 Configuration

### **API Endpoints**

#### **Weather Data**
- **Endpoint**: `/weather`
- **Method**: `POST` or `GET`
- **Parameters**:
  - `city` (string): City name
  - `lat` (float): Latitude (optional)
  - `lon` (float): Longitude (optional)

### **Theme Settings**
Themes are stored in localStorage:
- `light` - Light blue gradient theme
- `dark` - Dark slate theme
- `auto` - System preference

### **Unit Preferences**
Stored in localStorage:
- `unit_temp`: `C` or `F`
- `unit_wind`: `kmh` or `mph`
- `unit_pressure`: `hPa` or `inHg`

### **Favorites**
Stored in localStorage as JSON array:
```json
["London", "New York", "Tokyo"]
```

---

## 🎯 Usage Guide

### **Search for Weather**
1. Enter city name in the search bar
2. Click "Search" or press Enter
3. View current weather and forecasts

### **Change Theme**
- Click ☀️ for Light theme
- Click 🌙 for Dark theme
- Click 🌓 for Auto (system) theme

### **Add Favorites**
1. Search for a city
2. Click the ⭐+ button
3. Access favorites from the bar

### **Use Geolocation**
Click "📍 Use My Location" to auto-detect current location

### **Switch Units**
Click unit buttons in the personalization bar:
- Temperature: °C / °F
- Wind Speed: km/h / mph
- Pressure: hPa / inHg

### **View Forecasts**
Toggle between:
- **24H** - Hourly forecast for next 24 hours
- **3D** - Day/night temps for 3 days
- **7D** - Week overview with min/max temps

---

## 🎨 Customization

### **Change Color Scheme**
Edit CSS variables in `static/style.css`:
```css
:root {
    --accent-color: #38bdf8;  /* Primary accent */
    --bg-gradient: linear-gradient(120deg, #1e3c72, #2a5298);
    /* ... more variables */
}
```

### **Add Weather Icons**
Place custom icons in `static/icons/` and update the mapping in `app.js`:
```javascript
function mapIcon(iconCode) {
  if (iconCode.startsWith('01')) return 'clear.png';
  // Add more mappings
}
```

### **Modify Greetings**
Edit the `updateGreeting()` function in `static/app.js`:
```javascript
if (weatherDesc.includes('rain')) msg += ' – Custom rain message!';
```

---

## 🐛 Troubleshooting

### **API Key Issues**
- **Error**: "Failed to fetch weather data"
- **Solution**: Verify API key is correct and active

### **CORS Errors**
- **Solution**: Ensure Flask backend is running and accessible

### **Icons Not Loading**
- **Solution**: Check that icon files exist in `static/icons/`
- Verify paths in `mapIcon()` function

### **Theme Not Persisting**
- **Solution**: Check browser localStorage is enabled
- Clear cache and cookies if needed

### **Geolocation Not Working**
- **Solution**: Enable location permissions in browser
- Use HTTPS for production (geolocation requires secure context)

---

## 🔒 Security Notes

⚠️ **Important**: Never commit your API key to version control!

**Best Practices:**
1. Use environment variables for API keys
2. Add `.env` to `.gitignore`
3. Use backend proxy for API calls (already implemented)
4. Implement rate limiting for production
5. Validate all user inputs

---

## 📊 API Rate Limits

**OpenWeatherMap Free Tier:**
- 60 calls/minute
- 1,000,000 calls/month
- 3-hour forecast data delay

For production use, consider upgrading to a paid plan.

---

## 🚀 Deployment

### **Heroku Deployment**
```bash
# Install Heroku CLI
heroku create your-app-name
heroku config:set OPENWEATHER_API_KEY=your_key_here
git push heroku main
```

### **Vercel/Netlify**
- Use serverless functions for API calls
- Configure environment variables in dashboard

### **Docker**
```dockerfile
FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["python", "app.py"]
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👏 Acknowledgments

- **OpenWeatherMap** - Weather data API
- **Leaflet.js** - Interactive maps
- **Font Awesome** - Icons (if used)
- **Google Fonts** - Poppins & Inter fonts
- **Apple Design** - Glassmorphism inspiration

---

## 📧 Contact

**Developer**: Your Name  
**Email**: your.email@example.com  
**GitHub**: [@yourusername](https://github.com/yourusername)  
**Project Link**: [https://github.com/yourusername/modern-weather](https://github.com/yourusername/modern-weather)

---

## 🌟 Features Roadmap

- [ ] Weather alerts and notifications
- [ ] Historical weather data charts
- [ ] Air quality index (AQI)
- [ ] Precipitation radar
- [ ] Multiple location comparison
- [ ] Weather widgets for embedding
- [ ] PWA (Progressive Web App) support
- [ ] Dark sky background animations
- [ ] Voice search integration
- [ ] Social sharing features

---

## 📸 Screenshots

### Light Theme
![Light Theme](screenshots/light-theme.png)

### Dark Theme
![Dark Theme](screenshots/dark-theme.png)

### Mobile View
![Mobile View](screenshots/mobile.png)

### Forecast View
![Forecast](screenshots/forecast.png)

---

**⭐ If you like this project, please give it a star on GitHub! ⭐**

---

*Last Updated: January 2025*
