import AsyncStorage from '@react-native-async-storage/async-storage';

const WEATHER_CACHE_KEY = 'weather_cache';

export const getWeatherFromCache = async (city) => {
  try {
    const cache = await AsyncStorage.getItem(WEATHER_CACHE_KEY);
    if (cache) {
      const weatherData = JSON.parse(cache);
      return weatherData[city.toLowerCase()];
    }
  } catch (error) {
    console.error('Error reading from cache:', error);
  }
  return null;
};

export const saveWeatherToCache = async (city, data) => {
  try {
    const cache = await AsyncStorage.getItem(WEATHER_CACHE_KEY);
    let weatherData = cache ? JSON.parse(cache) : {};
    weatherData[city.toLowerCase()] = {
      ...data,
      cachedAt: new Date().toISOString()
    };
    await AsyncStorage.setItem(WEATHER_CACHE_KEY, JSON.stringify(weatherData));
  } catch (error) {
    console.error('Error saving to cache:', error);
  }
};

export const getAllCachedWeather = async () => {
  try {
    const cache = await AsyncStorage.getItem(WEATHER_CACHE_KEY);
    return cache ? JSON.parse(cache) : {};
  } catch (error) {
    console.error('Error getting cached weather:', error);
    return {};
  }
};

export const clearCache = async () => {
  try {
    await AsyncStorage.removeItem(WEATHER_CACHE_KEY);
  } catch (error) {
    console.error('Error clearing cache:', error);
  }
};
