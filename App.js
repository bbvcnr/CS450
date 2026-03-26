import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, Alert } from 'react-native';
import SearchWeather from './components/SearchWeather';
import WeatherCard from './components/WeatherCard';
import { fetchWeatherFromAPI, formatWeatherDisplay, isApiKeyConfigured } from './services/weatherService';
import { getCachedWeatherData, cacheWeatherData } from './services/weatherCache';

/**
 * Weather App - Week 04 Task
 * 
 * Features:
 * - Search weather by city name
 * - Display current temperature, conditions, and details
 * - Cache weather data locally to reduce API calls
 * - Error handling for city not found (404)
 * - API key validation and setup guide
 */
export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastSearchedCity, setLastSearchedCity] = useState('');
  const [isCachedData, setIsCachedData] = useState(false);
  const [apiKeyError, setApiKeyError] = useState(false);

  /**
   * Check API key configuration on app start
   * Note: Demo mode is enabled if API key is not configured
   */
  useEffect(() => {
    if (!isApiKeyConfigured()) {
      console.log('API Key not configured - Demo mode enabled. Try: London, New York, Tokyo');
      setApiKeyError(true);
    }
  }, []);

  /**
   * Handle search - check cache first, then API
   */
  const handleSearchWeather = useCallback(async (cityName) => {
    if (!cityName) return;

    setIsLoading(true);
    setWeatherData(null);
    setLastSearchedCity(cityName);

    try {
      // First, try to get from cache
      console.log(`Checking cache for ${cityName}...`);
      const cachedData = await getCachedWeatherData(cityName);

      if (cachedData) {
        // Use cached data
        const displayData = formatWeatherDisplay(cachedData);
        setWeatherData(displayData);
        setIsCachedData(true);
        console.log('Using cached weather data');
      } else {
        // Fetch from API and cache the result
        console.log(`No cache found, fetching from API for ${cityName}...`);
        const rawWeatherData = await fetchWeatherFromAPI(cityName);

        // Cache the data
        await cacheWeatherData(cityName, rawWeatherData);

        // Format and display
        const displayData = formatWeatherDisplay(rawWeatherData);
        setWeatherData(displayData);
        setIsCachedData(false);
        console.log('Fetched fresh weather data from API');
      }
    } catch (error) {
      console.error('Weather search error:', error);

      // Show error alert
      let errorMessage = error.message || 'An error occurred while fetching weather data';

      if (error.message.includes('404') || error.message.includes('not found')) {
        errorMessage = `City "${cityName}" not found. Please check the spelling and try again.`;
      } else if (error.message.includes('API Key not configured')) {
        errorMessage = 'Please configure your API key first';
        setApiKeyError(true);
      }

      Alert.alert('Search Error', errorMessage);
      setWeatherData(null);
      setIsCachedData(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Handle refresh - always fetch from API
   */
  const handleRefreshWeather = useCallback(async () => {
    if (!lastSearchedCity) return;

    setIsLoading(true);

    try {
      console.log(`Refreshing weather for ${lastSearchedCity} from API...`);
      const rawWeatherData = await fetchWeatherFromAPI(lastSearchedCity);

      // Cache the updated data
      await cacheWeatherData(lastSearchedCity, rawWeatherData);

      // Format and display
      const displayData = formatWeatherDisplay(rawWeatherData);
      setWeatherData(displayData);
      setIsCachedData(false);

      Alert.alert('Success', 'Weather data refreshed from API');
    } catch (error) {
      console.error('Refresh error:', error);
      Alert.alert('Refresh Error', error.message || 'Failed to refresh weather data');
    } finally {
      setIsLoading(false);
    }
  }, [lastSearchedCity]);

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        {/* Search Section */}
        <SearchWeather
          onSearch={handleSearchWeather}
          isLoading={isLoading}
        />

        {/* Weather Display Section */}
        <WeatherCard
          weatherData={weatherData}
          onRefresh={lastSearchedCity ? handleRefreshWeather : null}
          isCached={isCachedData}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});