# 🚀 Quick Start Guide

Get your Modern Weather Dashboard up and running in 5 minutes!

## Prerequisites

Before you begin, ensure you have:
- ✅ Python 3.7 or higher installed
- ✅ pip (Python package installer)
- ✅ A modern web browser
- ✅ Internet connection

## Step 1: Get the Code

### Option A: Clone with Git
```bash
git clone https://github.com/yourusername/modern-weather.git
cd modern-weather
```

### Option B: Download ZIP
1. Download the ZIP file from GitHub
2. Extract to your desired location
3. Open terminal/command prompt in that folder

## Step 2: Set Up Environment

### Create Virtual Environment (Recommended)

**Windows:**
```bash
python -m venv venv
venv\Scripts\activate
```

**macOS/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

You should see `(venv)` in your terminal prompt.

## Step 3: Install Dependencies

```bash
pip install -r requirements.txt
```

This installs:
- Flask (web framework)
- Requests (HTTP library)
- Other dependencies

## Step 4: Get API Key

1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Go to "API Keys" section
4. Copy your API key

**Note**: Free tier includes:
- 60 calls/minute
- 1,000,000 calls/month
- Current weather data
- 5-day forecast

## Step 5: Configure API Key

Open `app.py` and find this line:
```python
API_KEY = "your_api_key_here"
```

Replace with your actual key:
```python
API_KEY = "abc123def456..."  # Your OpenWeatherMap API key
```

**Better Option** (for security):

Create a `.env` file in the project root:
```bash
echo "OPENWEATHER_API_KEY=your_key_here" > .env
```

Then update `app.py`:
```python
from dotenv import load_dotenv
load_dotenv()

API_KEY = os.getenv('OPENWEATHER_API_KEY')
```

## Step 6: Run the Application

```bash
python app.py
```

You should see output like:
```
 * Running on http://127.0.0.1:5000
 * Running on http://0.0.0.0:5000
```

## Step 7: Open in Browser

Navigate to:
```
http://localhost:5000
```

Or:
```
http://127.0.0.1:5000
```

## 🎉 You're Done!

You should now see the Modern Weather Dashboard!

---

## Quick Feature Tour

### 1. Search for Weather
- Type a city name in the search bar
- Press Enter or click Search
- View current weather and forecasts

### 2. Change Theme
Click the theme buttons:
- ☀️ Light theme
- 🌙 Dark theme  
- 🌓 Auto (system preference)

### 3. Use Geolocation
Click "📍 Use My Location" to auto-detect your location

### 4. Save Favorites
1. Search for a city
2. Click the ⭐+ button
3. Click favorite cities for quick access

### 5. Change Units
Toggle units in the personalization bar:
- °C ↔ °F (temperature)
- km/h ↔ mph (wind speed)
- hPa ↔ inHg (pressure)

### 6. View Forecasts
Switch between forecast views:
- **24H** - Hourly for next 24 hours
- **3D** - Day/night temps for 3 days
- **7D** - Week overview

---

## Troubleshooting

### Issue: "Module not found" Error
**Solution**: Install dependencies
```bash
pip install -r requirements.txt
```

### Issue: "API key invalid"
**Solution**: 
1. Check your API key is correct
2. Wait 10 minutes after creating key (activation time)
3. Verify you're using the correct OpenWeatherMap key

### Issue: "Address already in use"
**Solution**: Port 5000 is busy
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:5000 | xargs kill
```

Or run on different port:
```bash
python app.py --port 5001
```

### Issue: No weather data showing
**Solution**:
1. Open browser console (F12)
2. Check for JavaScript errors
3. Verify API key is configured
4. Check internet connection

### Issue: Icons not loading
**Solution**:
1. Ensure `static/icons/` folder exists
2. Check icon files are present:
   - clear.png
   - clouds.png
   - rain.png
   - mist.png

---

## Next Steps

### Customize Your Dashboard

**Change Colors:**
Edit `static/style.css`:
```css
:root {
    --accent-color: #38bdf8;  /* Change this */
}
```

**Add More Cities:**
Edit `templates/index.html` to add quick city buttons

**Modify Greetings:**
Edit `static/app.js` in the `updateGreeting()` function

### Deploy Online

**Option 1: Heroku**
```bash
heroku create
git push heroku main
heroku config:set OPENWEATHER_API_KEY=your_key
```

**Option 2: PythonAnywhere**
1. Upload files
2. Set up web app
3. Configure WSGI

**Option 3: Vercel/Netlify**
Use serverless functions

See [README.md](README.md) for detailed deployment instructions.

---

## Need Help?

- 📖 Full documentation: [README.md](README.md)
- 🐛 Report bugs: [GitHub Issues](https://github.com/yourusername/modern-weather/issues)
- 💬 Ask questions: Open a discussion on GitHub
- 📧 Contact: your.email@example.com

---

## Useful Commands

```bash
# Start the app
python app.py

# Install dependencies
pip install -r requirements.txt

# Update dependencies
pip install -r requirements.txt --upgrade

# Freeze dependencies
pip freeze > requirements.txt

# Deactivate virtual environment
deactivate

# Run on custom port
export PORT=8000 && python app.py

# Production mode
export FLASK_ENV=production && python app.py
```

---

## Tips & Tricks

### 💡 Keyboard Shortcuts
- `Enter` in search box → Search
- `F12` → Open browser console (debugging)
- `Ctrl/Cmd + R` → Refresh page

### 💡 Best Practices
- Use virtual environment for isolation
- Store API keys in `.env` file
- Test on multiple browsers
- Clear cache if styles don't update

### 💡 Performance
- API calls are cached by browser
- LocalStorage persists preferences
- Icons load from local files (fast)

---

**Happy Weather Tracking! 🌤️**

*For detailed documentation, see [README.md](README.md)*
