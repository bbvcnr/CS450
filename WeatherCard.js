import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';

const WeatherCard = ({ weatherData, loading, error }) => {
  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text style={styles.loadingText}>Fetching weather data...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>❌ {error}</Text>
      </View>
    );
  }

  if (!weatherData) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>🔍 Search for a city to see weather</Text>
      </View>
    );
  }

  const backgroundColor = getBackgroundColor(weatherData.weather);

  return (
    <View style={[styles.cardContainer, { backgroundColor }]}>
      <View style={styles.headerSection}>
        <Text style={styles.cityName}>{weatherData.city}</Text>
        <Text style={styles.countryCode}>{weatherData.country}</Text>
      </View>

      <View style={styles.stationSection}>
        <Text style={styles.stationLabel}>Weather Station</Text>
        <Text style={styles.stationName}>{weatherData.station}</Text>
      </View>

      <View style={styles.temperatureSection}>
        <Text style={styles.temperature}>{weatherData.temperature}°C</Text>
        <View style={styles.iconContainer}>
          <Image
            source={{ uri: `https://openweathermap.org/img/w/${weatherData.icon}.png` }}
            style={styles.weatherIcon}
          />
        </View>
      </View>

      <View style={styles.conditionSection}>
        <Text style={styles.condition}>{weatherData.weather}</Text>
        <Text style={styles.description}>{weatherData.description}</Text>
      </View>

      <View style={styles.detailsGrid}>
        <View style={styles.detailBox}>
          <Text style={styles.detailLabel}>Feels Like</Text>
          <Text style={styles.detailValue}>{weatherData.feels_like}°C</Text>
        </View>
        <View style={styles.detailBox}>
          <Text style={styles.detailLabel}>Humidity</Text>
          <Text style={styles.detailValue}>{weatherData.humidity}%</Text>
        </View>
        <View style={styles.detailBox}>
          <Text style={styles.detailLabel}>Pressure</Text>
          <Text style={styles.detailValue}>{weatherData.pressure} hPa</Text>
        </View>
        <View style={styles.detailBox}>
          <Text style={styles.detailLabel}>Wind Speed</Text>
          <Text style={styles.detailValue}>{weatherData.wind_speed} m/s</Text>
        </View>
      </View>
    </View>
  );
};

const getBackgroundColor = (weather) => {
  const weatherLower = weather?.toLowerCase() || '';

  if (weatherLower.includes('cloud')) {
    return '#7f8c8d';
  } else if (weatherLower.includes('rain')) {
    return '#2c3e50';
  } else if (weatherLower.includes('snow')) {
    return '#bdc3c7';
  } else if (weatherLower.includes('clear') || weatherLower.includes('sunny')) {
    return '#2980b9';
  } else if (weatherLower.includes('thunder')) {
    return '#1a1a2e';
  }
  return '#2980b9';
};

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: '#34495e',
    fontWeight: '500',
  },
  errorContainer: {
    backgroundColor: '#ffe6e6',
    padding: 20,
    borderRadius: 12,
    marginHorizontal: 20,
    marginTop: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#e74c3c',
  },
  errorText: {
    fontSize: 16,
    color: '#c0392b',
    fontWeight: '600',
  },
  emptyContainer: {
    backgroundColor: '#ecf0f1',
    padding: 30,
    borderRadius: 12,
    marginHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#7f8c8d',
    fontWeight: '500',
  },
  cardContainer: {
    margin: 20,
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.2)',
  },
  cityName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  countryCode: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
  },
  stationSection: {
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 12,
    borderRadius: 8,
  },
  stationLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  stationName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  temperatureSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingVertical: 12,
  },
  temperature: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
  },
  iconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    padding: 8,
  },
  weatherIcon: {
    width: 80,
    height: 80,
  },
  conditionSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  condition: {
    fontSize: 22,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textTransform: 'capitalize',
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 12,
  },
  detailBox: {
    width: '48%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});

export default WeatherCard;
