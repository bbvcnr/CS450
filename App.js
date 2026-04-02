import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, StatusBar, SafeAreaView, Text } from 'react-native';
import SearchBar from './SearchBar';
import WeatherCard from './WeatherCard';
import { fetchWeather } from './weatherService';
import { getWeatherFromCache, saveWeatherToCache } from './storageService';

export default function App() {
  const [searchInput, setSearchInput] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!searchInput.trim()) {
      setError('Please enter a city name');
      return;
    }

    setLoading(true);
    setError(null);
    setWeatherData(null);

    try {
      // Check cache first
      const cachedData = await getWeatherFromCache(searchInput);
      if (cachedData) {
        setWeatherData(cachedData);
        setLoading(false);
        return;
      }

      // Fetch from API if not in cache
      const data = await fetchWeather(searchInput);

      if (data.error) {
        setError(data.error);
        setWeatherData(null);
      } else {
        setWeatherData(data);
        await saveWeatherToCache(searchInput, data);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#2c3e50" />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>🌤️ Weather Forecast</Text>
          <Text style={styles.subtitle}>Check weather in any city</Text>
        </View>

        <SearchBar
          value={searchInput}
          onChangeText={setSearchInput}
          onSearch={handleSearch}
          loading={loading}
        />

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <WeatherCard
            weatherData={weatherData}
            loading={loading}
            error={error}
          />
        </ScrollView>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            💾 Data is cached locally to reduce API requests
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#2c3e50',
  },
  container: {
    flex: 1,
    backgroundColor: '#2c3e50',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  scrollView: {
    flex: 1,
    marginBottom: 10,
  },
  footer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center',
  },
});

