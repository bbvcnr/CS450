/**
 * Weather API Service
 * Handles communication with OpenWeatherMap API
 * 
 * SETUP INSTRUCTIONS:
 * 1. Go to https://openweathermap.org/api
 * 2. Sign up and create a FREE account
 * 3. Generate an API Key from your account dashboard
 * 4. Replace 'YOUR_API_KEY_HERE' with your actual API key below
 * 
 * API Documentation: https://openweathermap.org/current
 */

const API_KEY = 'YOUR_API_KEY_HERE'; // Replace with your actual API key
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// Demo/Test mode - shows sample data when API key not configured
const DEMO_DATA = {
  'london': {
    city: 'London',
    country: 'GB',
    temperature: 12,
    temperatureMin: 8,
    temperatureMax: 14,
    feelsLike: 11,
    humidity: 86,
    pressure: 1022,
    windSpeed: 3.13,
    weatherMain: 'Clouds',
    weatherDescription: 'overcast clouds',
    weatherIcon: '04d',
    visibility: 10000,
    cloudiness: 100,
    timestamp: new Date().toISOString(),
    searchedCity: 'London'
  },
  'new york': {
    city: 'New York',
    country: 'US',
    temperature: 18,
    temperatureMin: 15,
    temperatureMax: 20,
    feelsLike: 17,
    humidity: 72,
    pressure: 1015,
    windSpeed: 5.2,
    weatherMain: 'Sunny',
    weatherDescription: 'clear sky',
    weatherIcon: '01d',
    visibility: 10000,
    cloudiness: 0,
    timestamp: new Date().toISOString(),
    searchedCity: 'New York'
  },
  'tokyo': {
    city: 'Tokyo',
    country: 'JP',
    temperature: 22,
    temperatureMin: 19,
    temperatureMax: 25,
    feelsLike: 21,
    humidity: 65,
    pressure: 1018,
    windSpeed: 2.8,
    weatherMain: 'Partly Cloudy',
    weatherDescription: 'scattered clouds',
    weatherIcon: '03d',
    visibility: 10000,
    cloudiness: 50,
    timestamp: new Date().toISOString(),
    searchedCity: 'Tokyo'
  }
};

/**
 * Fetch weather data from OpenWeatherMap API
 * @param {string} cityName - Name of the city to search for
 * @returns {Promise<Object>} Weather data object
 * @throws {Error} Throws error if city not found or API call fails
 */
export const fetchWeatherFromAPI = async (cityName) => {
  if (!cityName || typeof cityName !== 'string') {
    throw new Error('Invalid city name provided');
  }

  // DEMO MODE: Use sample data if API key not configured
  if (API_KEY === 'YOUR_API_KEY_HERE') {
    console.warn('API Key not configured - using DEMO MODE with sample data');
    
    const demoCity = cityName.toLowerCase().trim();
    if (DEMO_DATA[demoCity]) {
      console.log(`Demo mode: Returning sample data for ${cityName}`);
      return DEMO_DATA[demoCity];
    }
    
    // For cities not in demo data, throw 404 error
    throw new Error(`Demo Mode: City "${cityName}" not found. Try: London, New York, or Tokyo`);
  }

  try {
    const url = `${API_BASE_URL}?q=${encodeURIComponent(
      cityName.trim()
    )}&appid=${API_KEY}&units=metric`;

    console.log('Fetching weather from:', url.replace(API_KEY, '***'));

    const response = await fetch(url);

    // Check for 404 - City not found
    if (response.status === 404) {
      throw new Error(`City "${cityName}" not found. Please check the spelling and try again.`);
    }

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || `API error: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return parseWeatherData(data);
  } catch (error) {
    console.error('Weather API Error:', error.message);
    throw error;
  }
};

/**
 * Parse the raw API response and extract necessary weather data
 * @param {Object} rawData - Raw response from OpenWeatherMap API
 * @returns {Object} Parsed weather data
 */
const parseWeatherData = (rawData) => {
  if (!rawData.main || !rawData.weather || !Array.isArray(rawData.weather)) {
    throw new Error('Invalid API response format');
  }

  const weatherCondition = rawData.weather[0] || {};

  return {
    city: rawData.name || 'Unknown',
    country: rawData.sys?.country || 'N/A',
    temperature: Math.round(rawData.main.temp),
    temperatureMin: Math.round(rawData.main.temp_min),
    temperatureMax: Math.round(rawData.main.temp_max),
    feelsLike: Math.round(rawData.main.feels_like),
    humidity: rawData.main.humidity,
    pressure: rawData.main.pressure,
    windSpeed: rawData.wind?.speed || 0,
    weatherMain: weatherCondition.main || 'Unknown', // e.g., "Clouds"
    weatherDescription: weatherCondition.description || 'No description', // e.g., "overcast clouds"
    weatherIcon: weatherCondition.icon || '01d', // Icon code for image URL
    visibility: rawData.visibility,
    cloudiness: rawData.clouds?.all || 0,
    timestamp: new Date(rawData.dt * 1000).toISOString(),
    searchedCity: rawData.name // Store the exact city name from API
  };
};

/**
 * Get the weather icon URL
 * @param {string} iconCode - Icon code from API response (e.g., "04a")
 * @returns {string} Full URL to the weather icon image
 */
export const getWeatherIconUrl = (iconCode) => {
  if (!iconCode || typeof iconCode !== 'string') {
    return 'https://openweathermap.org/img/w/01d.png'; // Default clear sky icon
  }
  return `https://openweathermap.org/img/w/${iconCode}.png`;
};

/**
 * Format the API response data for display
 * @param {Object} weatherData - Parsed weather data
 * @returns {Object} Formatted display data
 */
export const formatWeatherDisplay = (weatherData) => {
  if (!weatherData) return null;

  return {
    heading: `${weatherData.city}, ${weatherData.country}`,
    temperature: `${weatherData.temperature}°C`,
    temperatureRange: `${weatherData.temperatureMin}°C - ${weatherData.temperatureMax}°C`,
    feelsLike: `Feels like ${weatherData.feelsLike}°C`,
    condition: weatherData.weatherDescription,
    conditionMain: weatherData.weatherMain,
    humidity: `${weatherData.humidity}%`,
    windSpeed: `${weatherData.windSpeed.toFixed(1)} m/s`,
    pressure: `${weatherData.pressure} hPa`,
    visibility: weatherData.visibility ? `${(weatherData.visibility / 1000).toFixed(1)} km` : 'N/A',
    cloudiness: `${weatherData.cloudiness}%`,
    iconUrl: getWeatherIconUrl(weatherData.weatherIcon)
  };
};

/**
 * Validate API Key configuration
 * @returns {boolean} True if API key is configured
 */
export const isApiKeyConfigured = () => {
  return API_KEY !== 'YOUR_API_KEY_HERE' && API_KEY.length > 0;
};
