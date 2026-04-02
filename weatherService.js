// OpenWeatherMap API configuration
const API_KEY = process.env.EXPO_PUBLIC_OPENWEATHER_API_KEY || 'YOUR_API_KEY_HERE';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const fetchWeather = async (city) => {
  try {
    const url = `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);
    
    if (response.status === 404) {
      return {
        error: 'City not found',
        status: 404
      };
    }
    
    if (!response.ok) {
      return {
        error: `API Error: ${response.status}`,
        status: response.status
      };
    }
    
    const data = await response.json();
    return {
      city: data.name,
      country: data.sys.country,
      station: data.sys.country,
      temperature: Math.round(data.main.temp),
      feels_like: Math.round(data.main.feels_like),
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      weather: data.weather[0].main,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      wind_speed: data.wind.speed,
      error: null,
      status: 200
    };
  } catch (error) {
    return {
      error: 'Network error. Please check your connection.',
      status: 0
    };
  }
};

export const getWeatherIconUrl = (iconCode) => {
  return `https://openweathermap.org/img/w/${iconCode}.png`;
};
