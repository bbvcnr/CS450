# Week 04 - Weather Forecast App

## Overview
A mobile weather forecast application built with React Native that fetches current weather data from OpenWeatherMap API, with local caching to reduce API calls and improve performance.

## Features Implemented ✅

### 1. **Search Weather by City**
- Input field to enter city name
- "SEARCH" button to fetch weather
- Input validation (2-50 characters)
- Error alerts for invalid input
- Press Enter to search

### 2. **Weather Display Card**
- City name and country code
- Current temperature (°C)
- Weather condition (icon + description)
- Feels-like temperature
- Min/Max temperature range
- Additional details:
  - Humidity percentage
  - Wind speed (m/s)
  - Atmospheric pressure (hPa)
  - Visibility (km)
  - Cloudiness percentage

### 3. **Local Caching System**
- Automatic cache on successful API call
- Check cache first before making API request
- Cache expires after 24 hours
- Visual indicator when showing cached data
- "From cache" badge on weather card
- Manual refresh button to fetch new data from API

### 4. **Error Handling**
- City not found (404) - shows specific error message
- Invalid API key - guide to setup
- Network errors - informative alerts
- Validation errors - input feedback

### 5. **API Integration**
- OpenWeatherMap Free API
- Metric units (Celsius)
- Weather icons from OpenWeatherMap CDN
- Comprehensive error handling

## Project Structure

```
profile-card-template/
├── App.js                              # Main app with weather logic
├── services/
│   ├── weatherService.js               # API communication & data parsing
│   └── weatherCache.js                 # Local cache management
├── components/
│   ├── SearchWeather.js                # Search input & button
│   └── WeatherCard.js                  # Weather display card
├── package.json                        # Dependencies
└── ... (other files)
```

## Setup Instructions

### 1. Get OpenWeatherMap API Key

1. Visit [https://openweathermap.org/api](https://openweathermap.org/api)
2. Sign up for a FREE account
3. Go to Account → API keys
4. Copy your API Key

**Example API Key Format:**
```
a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
```

### 2. Configure API Key in App

Open `services/weatherService.js` and replace:

```javascript
const API_KEY = 'YOUR_API_KEY_HERE'; // Replace with your actual API key
```

With:

```javascript
const API_KEY = 'YOUR_ACTUAL_API_KEY_HERE'; // e.g., 'a1b2c3d4e5f6...'
```

### 3. Install Dependencies

```bash
npm install
# or
yarn install
```

### 4. Run the App

```bash
# Start the development server
npm start

# Run on specific platform
npm run web
npm run android
npm run ios
```

## API Endpoint

```
https://api.openweathermap.org/data/2.5/weather?q=CITY&appid=API_KEY&units=metric
```

**Request Parameters:**
- `q` - City name
- `appid` - Your API Key
- `units=metric` - Use Celsius/metric units

**Response Status Codes:**
- `200` - Success
- `404` - City not found
- `401` - Invalid API key
- `429` - Too many requests

## Data Flow

```
User Search
    ↓
Check Local Cache
    ├─ Hit → Display Cached Data (fast)
    │
    └─ Miss → Fetch from API
         ↓
      Save to Cache
         ↓
      Display Fresh Data
```

## Cache Management

### Cache Storage
- **Location:** AsyncStorage (device local storage)
- **Key Format:** `weather_<city_name_lowercase>`
- **Expiration:** 24 hours
- **Data:** Raw parsed weather object

### Cache Functions
- `cacheWeatherData(city, data)` - Save to cache
- `getCachedWeatherData(city)` - Retrieve from cache
- `clearCityCache(city)` - Delete specific city cache
- `clearAllWeatherCache()` - Delete all weather cache
- `getCachedCities()` - List all cached cities
- `hasCachedWeatherData(city)` - Check if cache exists

## Component Details

### SearchWeather Component
- Input field with validation
- Loading state during fetch
- Error message display
- Accessibility features
- Props:
  - `onSearch(cityName)` - Callback when search initiated
  - `isLoading` - Boolean for loading state

### WeatherCard Component
- Displays parsed weather data
- Weather icon from OpenWeatherMap
- Temperature and condition details
- Refresh button to fetch new data
- Empty state when no search done
- Cached data badge
- Props:
  - `weatherData` - Formatted weather data object
  - `onRefresh()` - Callback for data refresh
  - `isCached` - Boolean indicating cached data

### Weather Service
- `fetchWeatherFromAPI(cityName)` - Fetch data from API
- `parseWeatherData(apiResponse)` - Extract and format data
- `getWeatherIconUrl(iconCode)` - Get weather icon URL
- `formatWeatherDisplay(data)` - Format for UI display
- `isApiKeyConfigured()` - Validate API key

## Weather Data Structure

### API Response (Partial)
```json
{
  "coord": {"lon": -0.1257, "lat": 51.5085},
  "weather": [
    {
      "id": 804,
      "main": "Clouds",
      "description": "overcast clouds",
      "icon": "04a"
    }
  ],
  "main": {
    "temp": 12.03,
    "feels_like": 11.53,
    "temp_min": 8.96,
    "temp_max": 12.98,
    "pressure": 1022,
    "humidity": 86
  },
  "visibility": 10000,
  "wind": {"speed": 3.13, "deg": 32},
  "clouds": {"all": 100},
  "sys": {
    "country": "GB",
    "sunrise": 1710191548,
    "sunset": 1710193596
  },
  "name": "London",
  "dt": 1710074201
}
```

### Parsed Display Format
```javascript
{
  heading: "London, GB",
  temperature: "12°C",
  temperatureRange: "8°C - 12°C",
  feelsLike: "Feels like 11°C",
  condition: "overcast clouds",
  humidity: "86%",
  windSpeed: "3.1 m/s",
  pressure: "1022 hPa",
  visibility: "10.0 km",
  cloudiness: "100%",
  iconUrl: "https://openweathermap.org/img/w/04a.png"
}
```

## Key Features Explained

### 1. Caching Logic
- **First Search:** Shows "Searching..." → API call → Cache → Display
- **Cached City:** Shows cached data instantly
- **After 24h:** Cache expires → Next search fetches fresh data
- **Manual Refresh:** Bypass cache, always fetch from API

### 2. Error Handling
- Empty input → Validation error
- Invalid city → 404 from API → User-friendly message
- No API key → Setup guide alert
- Network error → Error message
- API failure → Helpful error text

### 3. UX Features
- Loading indicator during fetch
- Cached data badge for transparency
- Refresh button always visible
- Empty state helpful message
- Accessibility labels and roles
- Enter key support for search

## Testing Scenarios

✅ Search valid city (London, New York, Tokyo)
✅ Search city not found (XYZ123)
✅ Empty search input
✅ Too short input (1 char)
✅ Search same city twice (uses cache)
✅ Click refresh button (API fresh data)
✅ Press Enter key in input
✅ Network error handling
✅ API key not configured

## API Limits

**Free Plan Limits:**
- 60 calls per minute (1 call per second)
- 1,000,000 calls per month
- 5-10 day forecast available

**Why Caching Matters:**
- Reduce API calls by 90%+
- Instant data retrieval for repeated searches
- Better app performance
- Stays within free plan limits

## Future Enhancements

1. **Multi-city Support**
   - Save favorite cities
   - Quick access to recent searches
   - Compare multiple cities

2. **Extended Forecast**
   - 5-10 day forecast
   - Hourly forecast
   - Historical weather data

3. **Advanced Features**
   - Weather alerts/notifications
   - Location-based weather
   - Weather maps
   - UV index, AQI

4. **UI/UX Improvements**
   - Night/Day theme based on weather
   - Animations for weather transitions
   - Dark mode support
   - Customizable units (F/C)

## Dependencies

```json
{
  "expo": "~55.0.7",
  "react": "19.2.0",
  "react-native": "0.83.2",
  "@react-native-async-storage/async-storage": "^1.21.0",
  "prop-types": "^15.8.1"
}
```

## Troubleshooting

### Blank Screen
- Check API key is configured
- Check internet connection
- Clear cache: `npm start` → press 'c' in terminal

### 401 Error (Unauthorized)
- Verify API key is correct
- Regenerate API key from OpenWeatherMap dashboard

### 404 Error (City Not Found)
- Check city spelling
- Try with country code (e.g., "London, GB")
- Some cities may have alternative names

### Cache Not Working
- Check AsyncStorage permissions
- Clear app cache and reinstall
- Verify 24-hour expiry hasn't passed

## Branch Information

- **Branch:** `week-04`
- **Status:** Complete
- **All requirements met:** ✅

---

**Week 04 Weather Forecast App Complete** 🌤️
