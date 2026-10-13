# Weather Intelligence App

A modern, responsive meteorological intelligence single-page application built with **React**, **TypeScript**, **Vite**, **Tailwind CSS**, and **Recharts**.

The application operates entirely client-side, communicating directly with public **Open-Meteo** endpoints with **zero API keys, secrets, or AI model dependencies**.

---

## 🌟 Key Features

### 1. Robust Geocoding & City Search
- **Search Bar & Instant Search**: Type any city name globally to query the Open-Meteo geocoding service.
- **Empty Input Validation**: Client-side validation prevents unnecessary network calls if the search box is empty.
- **Exact "City Not Found" Handling**: If the Open-Meteo geocoding API returns an empty or missing `results` array, the app cleanly shows:  
  *`"City not found. Check the spelling and try again."`*
- **Multiple Matches Disambiguation Picker**: When multiple locations match (e.g., *Paris, France* vs *Paris, Texas, USA*), an interactive modal presents each result's **City Name**, **Admin1 (State / Region)**, and **Country**, allowing the user to pinpoint their target destination.
- **Popular City Quick Select**: One-click pills for cities like Tokyo, London, New York, Paris, Sydney, Singapore, Dubai, and Mumbai.

### 2. Live Atmospheric Telemetry (Current Weather)
- **Temperature & Apparent (Feels-Like) Temperature**: Instant thermal perception reading.
- **Humidity & Wind Speed**: Relative humidity (%) and 10-meter wind speed (km/h).
- **Precipitation**: Current mm precipitation rate.
- **WMO Code Mapping**: Full interpretation of WMO (World Meteorological Organization) weather codes (0–99) mapped to descriptive weather labels and contextual Lucide icons.
- **Unit Switching**: Seamless toggle between Celsius (°C) and Fahrenheit (°F).

### 3. 7-Day Forecast & Interactive Visuals
- **Daily Forecast Cards**: 7 cards displaying day names, dates, WMO condition labels, High/Low temperatures, rain probabilities, peak wind speeds, and UV indices.
- **Max & Min Temperature Line Chart (Recharts)**: Smooth diurnal temperature curve over the 7-day window.
- **Precipitation Probability Bar Chart (Recharts)**: Daily rain probability bars with a designated **60% Umbrella Trigger Threshold reference line**.
- **Interactive Day Inspection**: Clicking any day card highlights and updates the Planning Advisory section for that specific day.

### 4. Deterministic Activity Planning Advisory (Rule Engine - No AI)
To guarantee 100% deterministic, hallucination-free advice, daily conditions are evaluated against rigorous meteorological rules:
- **Rain Probability $\ge$ 60%** $\rightarrow$ *Carry an umbrella / consider rescheduling outdoor plans*
- **Max Temperature $\ge$ 35°C** $\rightarrow$ *Avoid midday outdoor work and stay hydrated*
- **UV Index $\ge$ 8** $\rightarrow$ *Very high UV index: use sun protection (SPF 50+, hat, sunglasses)*
- **Wind Speed $\ge$ 40 km/h** $\rightarrow$ *High wind alert: caution for two-wheeler travel and outdoor loose objects*
- **Otherwise** $\rightarrow$ *Good day for outdoor plans (favorable conditions)*

Includes an actionable status checklist for:
- Commute and two-wheeler safety
- Midday outdoor work safety
- Sunscreen / UV protection requirements
- Leisure / outdoor sports suitability

### 5. Application States
- **Loading State**: Clean spinner and status description during geocoding and weather fetch requests.
- **Empty State**: Welcoming initial hero screen with feature highlights and recommended starting destinations.
- **City Not Found**: Dedicated advisory banner when a location cannot be resolved.
- **Network / API Error State**: Graceful network error handling with an interactive **Retry** button that re-executes the failed request.

---

## 📡 Open-Meteo Endpoints Used

1. **Geocoding API**:
   ```
   https://geocoding-api.open-meteo.com/v1/search?name={city}&count=5&language=en&format=json
   ```
2. **Forecast API**:
   ```
   https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,precipitation&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,uv_index_max,wind_speed_10m_max&timezone=auto&forecast_days=7
   ```

---

## 🚀 Running the App Locally

```bash
# Install dependencies
npm install

# Start Vite development server
npm run dev
```

Visit `http://localhost:3000` in your browser.
