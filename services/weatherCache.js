/**
 * Weather Cache Service
 * Stores and retrieves weather data from device local storage
 * Reduces API calls and improves performance
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

const CACHE_KEY_PREFIX = 'weather_';
const CACHE_EXPIRY_HOURS = 24; // Cache expires after 24 hours

/**
 * Get cache key for a city
 * @param {string} cityName - City name to search for
 * @returns {string} Cache key
 */
const getCacheKey = (cityName) => {
  return `${CACHE_KEY_PREFIX}${cityName.toLowerCase().trim()}`;
};

/**
 * Save weather data to local cache
 * @param {string} cityName - City name (search key)
 * @param {Object} weatherData - Weather data to cache
 * @returns {Promise<void>}
 */
export const cacheWeatherData = async (cityName, weatherData) => {
  try {
    if (!cityName || !weatherData) {
      throw new Error('City name and weather data required for caching');
    }

    const cacheKey = getCacheKey(cityName);
    const cacheEntry = {
      data: weatherData,
      timestamp: Date.now(),
      expiryTime: Date.now() + CACHE_EXPIRY_HOURS * 60 * 60 * 1000
    };

    await AsyncStorage.setItem(cacheKey, JSON.stringify(cacheEntry));
    console.log(`Weather data cached for ${cityName}`);
  } catch (error) {
    console.error('Error caching weather data:', error);
    // Don't throw - caching failure shouldn't break the app
  }
};

/**
 * Get weather data from cache
 * @param {string} cityName - City name to retrieve
 * @returns {Promise<Object|null>} Cached weather data or null if not found/expired
 */
export const getCachedWeatherData = async (cityName) => {
  try {
    if (!cityName) return null;

    const cacheKey = getCacheKey(cityName);
    const cachedItem = await AsyncStorage.getItem(cacheKey);

    if (!cachedItem) {
      console.log(`No cache found for ${cityName}`);
      return null;
    }

    const cacheEntry = JSON.parse(cachedItem);

    // Check if cache has expired
    if (Date.now() > cacheEntry.expiryTime) {
      console.log(`Cache expired for ${cityName}, removing...`);
      await AsyncStorage.removeItem(cacheKey);
      return null;
    }

    console.log(`Using cached data for ${cityName}`);
    return cacheEntry.data;
  } catch (error) {
    console.error('Error retrieving cached weather data:', error);
    return null;
  }
};

/**
 * Clear cache for a specific city
 * @param {string} cityName - City name to clear cache for
 * @returns {Promise<void>}
 */
export const clearCityCache = async (cityName) => {
  try {
    if (!cityName) throw new Error('City name required');

    const cacheKey = getCacheKey(cityName);
    await AsyncStorage.removeItem(cacheKey);
    console.log(`Cache cleared for ${cityName}`);
  } catch (error) {
    console.error('Error clearing city cache:', error);
  }
};

/**
 * Clear all weather cache
 * @returns {Promise<void>}
 */
export const clearAllWeatherCache = async () => {
  try {
    const allKeys = await AsyncStorage.getAllKeys();
    const weatherKeys = allKeys.filter(key => key.startsWith(CACHE_KEY_PREFIX));

    if (weatherKeys.length === 0) {
      console.log('No weather cache to clear');
      return;
    }

    await AsyncStorage.multiRemove(weatherKeys);
    console.log(`Cleared ${weatherKeys.length} weather cache entries`);
  } catch (error) {
    console.error('Error clearing all weather cache:', error);
  }
};

/**
 * Get all cached cities
 * @returns {Promise<Array>} Array of cached city names
 */
export const getCachedCities = async () => {
  try {
    const allKeys = await AsyncStorage.getAllKeys();
    const weatherKeys = allKeys.filter(key => key.startsWith(CACHE_KEY_PREFIX));

    const cities = weatherKeys.map(key => key.replace(CACHE_KEY_PREFIX, ''));
    return cities;
  } catch (error) {
    console.error('Error getting cached cities:', error);
    return [];
  }
};

/**
 * Check if weather data exists in cache and is still valid
 * @param {string} cityName - City name to check
 * @returns {Promise<boolean>} True if valid cache exists
 */
export const hasCachedWeatherData = async (cityName) => {
  try {
    const cachedData = await getCachedWeatherData(cityName);
    return cachedData !== null;
  } catch (error) {
    console.error('Error checking cache:', error);
    return false;
  }
};

/**
 * Get cache statistics
 * @returns {Promise<Object>} Cache statistics
 */
export const getCacheStats = async () => {
  try {
    const cachedCities = await getCachedCities();
    const stats = {
      totalCached: cachedCities.length,
      cities: cachedCities,
      cacheExpiryHours: CACHE_EXPIRY_HOURS
    };
    return stats;
  } catch (error) {
    console.error('Error getting cache stats:', error);
    return { totalCached: 0, cities: [] };
  }
};
