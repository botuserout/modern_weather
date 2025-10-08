let map;
let marker;

// Map OpenWeatherMap icon code to local PNG filename
function mapIcon(iconCode) {
  if (iconCode.startsWith('01')) return 'clear.png';
  if (iconCode.startsWith('02') || iconCode.startsWith('03') || iconCode.startsWith('04')) return 'clouds.png';
  if (iconCode.startsWith('09') || iconCode.startsWith('10') || iconCode.startsWith('11')) return 'rain.png';
  if (iconCode.startsWith('50')) return 'mist.png';
  return 'clouds.png'; // fallback
}
window.onload = () => {
  map = L.map("map").setView([20.5937, 78.9629], 5);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
  setupPersonalization();
};

// --- Personalization logic ---
function setupPersonalization() {
  // Theme
  setupThemeToggle();
  // Greeting
  updateGreeting();
  // Clock
  updateClock();
  setInterval(updateClock, 1000); // Update every second
  // Favorites
  renderFavorites();
  const addFavBtn = document.getElementById('addFavoriteBtn');
  if (addFavBtn) addFavBtn.onclick = addFavorite;
  // Geolocation
  const geoBtn = document.getElementById('geoBtn');
  if (geoBtn) geoBtn.onclick = useGeolocation;
  // Units
  setupUnitToggles();
  console.log('✅ Personalization setup complete');
}

// --- Live Clock ---
function updateClock() {
  const now = new Date();
  
  // Format time (HH:MM:SS with 12-hour format)
  let hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  
  hours = hours % 12;
  hours = hours ? hours : 12; // 0 should be 12
  
  const timeString = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} ${ampm}`;
  
  // Format date (Day, Month DD, YYYY)
  const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
  const dateString = now.toLocaleDateString('en-US', options);
  
  // Update DOM
  const clockTime = document.getElementById('clockTime');
  const clockDate = document.getElementById('clockDate');
  
  if (clockTime) clockTime.textContent = timeString;
  if (clockDate) clockDate.textContent = dateString;
}

// --- Theme Management ---
function setupThemeToggle() {
  const themeLight = document.getElementById('theme-light');
  const themeDark = document.getElementById('theme-dark');
  const themeAuto = document.getElementById('theme-auto');
  
  if (themeLight) themeLight.onclick = () => setTheme('light');
  if (themeDark) themeDark.onclick = () => setTheme('dark');
  if (themeAuto) themeAuto.onclick = () => setTheme('auto');
  
  // Apply saved theme or default to light
  const savedTheme = localStorage.getItem('theme') || 'light';
  applyTheme(savedTheme);
}

function setTheme(theme) {
  localStorage.setItem('theme', theme);
  applyTheme(theme);
}

function applyTheme(theme) {
  const body = document.body;
  
  // Remove all theme classes
  body.classList.remove('theme-light', 'theme-dark', 'theme-auto');
  
  // Add the selected theme class
  body.classList.add(`theme-${theme}`);
  
  // Update button active states
  document.querySelectorAll('.theme-btn').forEach(btn => btn.classList.remove('active'));
  const activeBtn = document.getElementById(`theme-${theme}`);
  if (activeBtn) activeBtn.classList.add('active');
  
  console.log(`🎨 Theme applied: ${theme}`);
}

function updateGreeting(weatherDesc) {
  const hour = new Date().getHours();
  let part = hour < 5 ? 'Night' : hour < 12 ? 'Morning' : hour < 18 ? 'Afternoon' : 'Evening';
  let emoji = hour < 5 || hour >= 20 ? '🌙' : hour < 12 ? '☀️' : hour < 18 ? '🌤️' : '🌇';
  let msg = `Good ${part} ${emoji}`;
  if (weatherDesc) {
    if (weatherDesc.includes('rain')) msg += ' – It might rain, stay cozy!';
    else if (weatherDesc.includes('clear')) msg += ' – Clear skies ahead!';
    else if (weatherDesc.includes('cloud')) msg += ' – A bit cloudy today.';
    else if (weatherDesc.includes('mist') || weatherDesc.includes('fog')) msg += ' – Drive safe in the mist!';
  }
  const greetEl = document.getElementById('greetingMsg');
  if (greetEl) greetEl.innerText = msg;
}

function getFavorites() {
  return JSON.parse(localStorage.getItem('favorites') || '[]');
}
function setFavorites(favs) {
  localStorage.setItem('favorites', JSON.stringify(favs));
}
function renderFavorites() {
  const favs = getFavorites();
  const list = document.getElementById('favoritesList');
  if (!list) return;
  list.innerHTML = '';
  if (favs.length === 0) {
    list.innerHTML = '<span style="color: #94a3b8; font-size: 0.92em; margin-left: 6px;">None yet</span>';
    return;
  }
  favs.forEach(city => {
    const span = document.createElement('span');
    span.textContent = city;
    span.className = 'fav-city';
    span.onclick = () => {
      document.getElementById('cityInput').value = city;
      updateWeather(city);
    };
    const rm = document.createElement('button');
    rm.textContent = '×';
    rm.className = 'fav-remove';
    rm.onclick = e => { e.stopPropagation(); removeFavorite(city); };
    span.appendChild(rm);
    list.appendChild(span);
  });
}
function addFavorite() {
  const cityEl = document.getElementById('cityName');
  if (!cityEl) return;
  const city = cityEl.innerText;
  if (!city || city === '--') {
    alert('⚠️ Please search for a city first!');
    return;
  }
  let favs = getFavorites();
  if (favs.includes(city)) {
    alert(`⭐ ${city} is already in favorites!`);
    return;
  }
  favs.push(city);
  setFavorites(favs);
  renderFavorites();
}
function removeFavorite(city) {
  let favs = getFavorites().filter(c => c !== city);
  setFavorites(favs);
  renderFavorites();
}
function useGeolocation() {
  if (!navigator.geolocation) return alert('Geolocation not supported');
  navigator.geolocation.getCurrentPosition(pos => {
    // Use reverse geocoding to get city name, or fetch by coordinates
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`)
      .then(res => res.json())
      .then(geoData => {
        const city = geoData.address.city || geoData.address.town || geoData.address.village || geoData.address.county || 'Unknown';
        document.getElementById("cityInput").value = city;
        updateWeather(city);
      })
      .catch(error => {
        console.error('Geolocation error:', error);
        alert('Failed to get location. Please try searching manually.');
      });
  }, error => {
    console.error('Geolocation error:', error);
    alert('Failed to get your location. Please enable location access.');
  });
}
function updateWeatherFromData(data) {
  if (data.current) {
    const w = data.current;
    document.getElementById("cityName").innerText = w.name;
    document.getElementById("temp").innerText = Math.round(w.main.temp) + "°C";
    document.getElementById("desc").innerText = w.weather[0].description;
    updateGreeting(w.weather[0].description);
    
    // Update all weather details
    const iconMap = {
      Thunderstorm: '⛈️', Drizzle: '🌦️', Rain: '🌧️', Snow: '❄️', Clear: '☀️', Clouds: '☁️', Mist: '🌫️', Smoke: '🌫️', Haze: '🌫️', Dust: '🌫️', Fog: '🌫️', Sand: '🌫️', Ash: '🌫️', Squall: '🌬️', Tornado: '🌪️'
    };
    document.getElementById("weatherIcon").innerText = iconMap[w.weather[0].main] || '🌈';
    document.getElementById("humidity").innerText = w.main.humidity + "%";
    document.getElementById("wind").innerText = Math.round(w.wind.speed) + " km/h";
    document.getElementById("pressure").innerText = w.main.pressure + " hPa";
    document.getElementById("feelsLike").innerText = Math.round(w.main.feels_like) + "°";
    document.getElementById("highLow").innerText = (w.main.temp_max ? Math.round(w.main.temp_max) : "--") + "/" + (w.main.temp_min ? Math.round(w.main.temp_min) : "--") + "°";
    document.getElementById("visibility").innerText = w.visibility ? (w.visibility / 1000).toFixed(2) + " km" : "--";
    
    // Update map
    const lat = w.coord.lat, lon = w.coord.lon;
    map.setView([lat, lon], 8);
    if (marker) map.removeLayer(marker);
    marker = L.marker([lat, lon]).addTo(map);
    
    // Draw forecast if available
    if (data.forecast && data.forecast.list) {
      drawForecast(data.forecast);
    }
  }
}
function setupUnitToggles() {
  // Temp
  document.getElementById('toggle-temp').onclick = () => setUnit('temp', 'C');
  document.getElementById('toggle-temp-f').onclick = () => setUnit('temp', 'F');
  // Wind
  document.getElementById('toggle-wind').onclick = () => setUnit('wind', 'kmh');
  document.getElementById('toggle-wind-mph').onclick = () => setUnit('wind', 'mph');
  // Pressure
  document.getElementById('toggle-pressure').onclick = () => setUnit('pressure', 'hPa');
  document.getElementById('toggle-pressure-inhg').onclick = () => setUnit('pressure', 'inHg');
  applyUnits();
}
function setUnit(type, val) {
  localStorage.setItem('unit_' + type, val);
  applyUnits();
}
function getUnit(type) {
  return localStorage.getItem('unit_' + type) || (type === 'temp' ? 'C' : type === 'wind' ? 'kmh' : 'hPa');
}
function applyUnits() {
  // Toggle active states
  const unitMap = {
    'temp': { 'C': 'toggle-temp', 'F': 'toggle-temp-f' },
    'wind': { 'kmh': 'toggle-wind', 'mph': 'toggle-wind-mph' },
    'pressure': { 'hPa': 'toggle-pressure', 'inHg': 'toggle-pressure-inhg' }
  };
  ['temp','wind','pressure'].forEach(type => {
    const val = getUnit(type);
    document.querySelectorAll(`[id^=toggle-${type}]`).forEach(btn => btn.classList.remove('active'));
    const btnId = unitMap[type][val];
    if (btnId) {
      const btn = document.getElementById(btnId);
      if (btn) btn.classList.add('active');
    }
  });
  // Update values if needed (requires further integration)
}

function fetchWeather() {
  const city = document.getElementById("cityInput").value;
  updateWeather(city);
}

function quickCity(city) {
  document.getElementById("cityInput").value = city;
  updateWeather(city);
}

function updateWeather(city) {
  fetch("/weather", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: "city=" + city
  })
  .then(res => res.json())
  .then(data => {
    console.log('Weather data received:', data); // Debug log
    if (data.current) {
      const w = data.current;
      document.getElementById("cityName").innerText = w.name;
      document.getElementById("temp").innerText = Math.round(w.main.temp) + "°C";
      document.getElementById("desc").innerText = w.weather[0].description;
      // Update greeting with weather
      updateGreeting(w.weather[0].description);
      // Set weather icon (simple mapping)
      const iconMap = {
        Thunderstorm: '⛈️', Drizzle: '🌦️', Rain: '🌧️', Snow: '❄️', Clear: '☀️', Clouds: '☁️', Mist: '🌫️', Smoke: '🌫️', Haze: '🌫️', Dust: '🌫️', Fog: '🌫️', Sand: '🌫️', Ash: '🌫️', Squall: '🌬️', Tornado: '🌪️'
      };
      const setTextContent = (id, text) => {
        const el = document.getElementById(id);
        if (el) el.innerText = text;
      };

      setTextContent("weatherIcon", iconMap[w.weather[0].main] || '🌈');
      setTextContent("humidity", w.main.humidity + "%");
      setTextContent("wind", Math.round(w.wind.speed) + " km/h");
      setTextContent("pressure", w.main.pressure + " hPa");
      setTextContent("feelsLike", Math.round(w.main.feels_like) + "°");
      setTextContent("highLow", (w.main.temp_max ? Math.round(w.main.temp_max) : "--") + "/" + (w.main.temp_min ? Math.round(w.main.temp_min) : "--") + "°");
      setTextContent("visibility", w.visibility ? (w.visibility / 1000).toFixed(2) + " km" : "--");
      setTextContent("dewPoint", w.main.dew_point ? Math.round(w.main.dew_point) + "°" : "--");
      setTextContent("uvIndex", data.current.uvi !== undefined ? data.current.uvi : "--");
      setTextContent("moonPhase", (data.forecast && data.forecast.city && data.forecast.city.moon_phase) ? data.forecast.city.moon_phase : '--');
      
      // Sunrise/Sunset
      function formatTime(ts) {
        if (!ts) return '--:--';
        const d = new Date(ts * 1000);
        return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      }
      setTextContent("sunrise", w.sys.sunrise ? formatTime(w.sys.sunrise) : '--:--');
      setTextContent("sunset", w.sys.sunset ? formatTime(w.sys.sunset) : '--:--');

      const lat = w.coord.lat, lon = w.coord.lon;
      map.setView([lat, lon], 8);
      if (marker) map.removeLayer(marker);
      marker = L.marker([lat, lon]).addTo(map);

      // Draw forecast if available
      if (data.forecast && data.forecast.list) {
        console.log('Drawing forecast with', data.forecast.list.length, 'items');
        drawForecast(data.forecast);
      } else {
        console.error('No forecast data available');
      }
    } else {
      console.error('No current weather data in response');
    }
  })
  .catch(error => {
    console.error('Error fetching weather:', error);
    alert('Failed to fetch weather data. Please try again.');
  });
}

function drawForecast(forecastData) {
  console.log('drawForecast called with:', forecastData);
  
  if (!forecastData || !forecastData.list || forecastData.list.length === 0) {
    console.error('Invalid forecast data');
    return;
  }

  // --- 24H Forecast ---
  try {
    const hourly = forecastData.list.slice(0, 24);
    const forecast24h = document.getElementById('forecast24hCards');
    if (!forecast24h) {
      console.error('forecast24hCards element not found');
      return;
    }
    forecast24h.innerHTML = '';
    hourly.forEach(f => {
      const card = document.createElement('div');
      card.className = 'forecast-card';
      const date = new Date(f.dt * 1000);
      const hours = date.getHours();
      card.innerHTML = `
        <div class="forecast-hour">${hours}:00</div>
        <div class="forecast-icon" title="${f.weather[0].description}">
          <img src="static/icons/${mapIcon(f.weather[0].icon)}" alt="icon"/>
        </div>
        <div class="forecast-temp">${Math.round(f.main.temp)}°C</div>
        <div class="forecast-humidity">💧${f.main.humidity}%</div>
        <div class="forecast-precip">☔${f.pop ? Math.round(f.pop * 100) : 0}%</div>
      `;
      forecast24h.appendChild(card);
    });
    console.log('24H forecast rendered:', hourly.length, 'cards');
  } catch (error) {
    console.error('Error rendering 24H forecast:', error);
  }

  // --- 3D Forecast ---
  try {
    const daily = {};
    forecastData.list.forEach(f => {
      const date = new Date(f.dt * 1000).toISOString().split('T')[0];
      if (!daily[date]) daily[date] = [];
      daily[date].push(f);
    });
    const dates = Object.keys(daily).slice(0, 3);
    const forecast3d = document.getElementById('forecast3dCards');
    if (!forecast3d) {
      console.error('forecast3dCards element not found');
      return;
    }
    forecast3d.innerHTML = '';
    dates.forEach(date => {
      const dayArr = daily[date];
      const day = new Date(date + 'T00:00:00');
      const dayTemps = dayArr.filter(f => {
        const hour = new Date(f.dt * 1000).getHours();
        return hour >= 6 && hour <= 18;
      }).map(f => f.main.temp);
      const nightTemps = dayArr.filter(f => {
        const hour = new Date(f.dt * 1000).getHours();
        return hour < 6 || hour > 18;
      }).map(f => f.main.temp);
      const icon = dayArr[Math.floor(dayArr.length/2)].weather[0].icon;
      const desc = dayArr[Math.floor(dayArr.length/2)].weather[0].description;
      const card = document.createElement('div');
      card.className = 'forecast-card';
      card.innerHTML = `
        <div class="forecast-day">${day.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}</div>
        <div class="forecast-icon" title="${desc}">
          <img src="static/icons/${mapIcon(icon)}" alt="icon"/>
        </div>
        <div class="forecast-range">
          <span class="day-temp">${dayTemps.length ? Math.round(Math.max(...dayTemps)) : '--'}°</span> /
          <span class="night-temp">${nightTemps.length ? Math.round(Math.min(...nightTemps)) : '--'}°</span>
        </div>
        <div class="forecast-desc">${desc.replace(/(^|\s)\S/g, l => l.toUpperCase())}</div>
      `;
      forecast3d.appendChild(card);
    });
    console.log('3D forecast rendered:', dates.length, 'cards');
  } catch (error) {
    console.error('Error rendering 3D forecast:', error);
  }

  // --- 7D Forecast ---
  try {
    const daily = {};
    forecastData.list.forEach(f => {
      const date = new Date(f.dt * 1000).toISOString().split('T')[0];
      if (!daily[date]) daily[date] = [];
      daily[date].push(f);
    });
    const weekDates = Object.keys(daily).slice(0, 7);
    const forecast7d = document.getElementById('forecast7dCards');
    if (!forecast7d) {
      console.error('forecast7dCards element not found');
      return;
    }
    forecast7d.innerHTML = '';
    weekDates.forEach(date => {
      const dayArr = daily[date];
      const day = new Date(date + 'T00:00:00');
      const temps = dayArr.map(f => f.main.temp);
      const minT = Math.round(Math.min(...temps));
      const maxT = Math.round(Math.max(...temps));
      const icon = dayArr[Math.floor(dayArr.length/2)].weather[0].icon;
      const desc = dayArr[Math.floor(dayArr.length/2)].weather[0].description;
      const card = document.createElement('div');
      card.className = 'forecast-card';
      card.innerHTML = `
        <div class="forecast-day">${day.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}</div>
        <div class="forecast-icon" title="${desc}">
          <img src="static/icons/${mapIcon(icon)}" alt="icon"/>
        </div>
        <div class="forecast-range">
          <span class="max-temp">${maxT}°</span> /
          <span class="min-temp">${minT}°</span>
        </div>
        <div class="forecast-desc">${desc.replace(/(^|\s)\S/g, l => l.toUpperCase())}</div>
      `;
      forecast7d.appendChild(card);
    });
    console.log('7D forecast rendered:', weekDates.length, 'cards');
  } catch (error) {
    console.error('Error rendering 7D forecast:', error);
  }
}

// Toggle logic for forecast modes with animation
function setupForecastToggle() {
  const toggles = document.querySelectorAll('.toggle-btn');
  const views = document.querySelectorAll('.forecast-view');
  toggles.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
      toggles.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      views.forEach((v, i) => {
        if (i === idx) {
          v.classList.add('active');
          v.classList.add('fade-in');
          setTimeout(() => v.classList.remove('fade-in'), 400);
        } else {
          v.classList.remove('active');
        }
      });
    });
  });
}
window.addEventListener('DOMContentLoaded', setupForecastToggle);