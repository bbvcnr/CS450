import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';

/**
 * WeatherCard Component
 * Displays weather information in a card format
 */
const WeatherCard = ({ weatherData, onRefresh, isCached = false }) => {
  if (!weatherData) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Search for a city to see the weather forecast</Text>
      </View>
    );
  }

  const {
    heading,
    temperature,
    temperatureRange,
    feelsLike,
    condition,
    humidity,
    windSpeed,
    pressure,
    visibility,
    cloudiness,
    iconUrl
  } = weatherData;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.card}>
        {/* Header with city and country */}
        <View style={styles.header}>
          <View>
            <Text style={styles.cityName}>{heading}</Text>
            {isCached && (
              <Text style={styles.cachedBadge}>📦 From cache</Text>
            )}
          </View>
          {onRefresh && (
            <TouchableOpacity
              style={styles.refreshButton}
              onPress={onRefresh}
              accessible={true}
              accessibilityLabel="Refresh weather"
              accessibilityRole="button"
            >
              <Text style={styles.refreshIcon}>🔄</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Weather Icon and Main Temperature */}
        <View style={styles.mainWeather}>
          <View style={styles.iconContainer}>
            <Image
              source={{ uri: iconUrl }}
              style={styles.weatherIcon}
              onError={(error) => console.log('Image load error:', error)}
            />
          </View>

          <View style={styles.temperatureContainer}>
            <Text style={styles.temperature}>{temperature}</Text>
            <Text style={styles.condition}>{condition}</Text>
            <Text style={styles.feelsLike}>{feelsLike}</Text>
          </View>
        </View>

        {/* Temperature Range */}
        <View style={styles.rangeContainer}>
          <Text style={styles.rangeText}>{temperatureRange}</Text>
        </View>

        {/* Weather Details Grid */}
        <View style={styles.detailsGrid}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Humidity</Text>
            <Text style={styles.detailValue}>{humidity}</Text>
          </View>

          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Wind Speed</Text>
            <Text style={styles.detailValue}>{windSpeed}</Text>
          </View>

          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Pressure</Text>
            <Text style={styles.detailValue}>{pressure}</Text>
          </View>

          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Visibility</Text>
            <Text style={styles.detailValue}>{visibility}</Text>
          </View>

          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Cloudiness</Text>
            <Text style={styles.detailValue}>{cloudiness}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

WeatherCard.propTypes = {
  weatherData: PropTypes.shape({
    heading: PropTypes.string,
    temperature: PropTypes.string,
    temperatureRange: PropTypes.string,
    feelsLike: PropTypes.string,
    condition: PropTypes.string,
    humidity: PropTypes.string,
    windSpeed: PropTypes.string,
    pressure: PropTypes.string,
    visibility: PropTypes.string,
    cloudiness: PropTypes.string,
    iconUrl: PropTypes.string
  }),
  onRefresh: PropTypes.func,
  isCached: PropTypes.bool
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 16
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 40
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    fontStyle: 'italic'
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    marginBottom: 20
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  cityName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4
  },
  cachedBadge: {
    fontSize: 12,
    color: '#FF9800',
    fontWeight: '600'
  },
  refreshButton: {
    padding: 8,
    marginTop: -8
  },
  refreshIcon: {
    fontSize: 24
  },
  mainWeather: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 16
  },
  iconContainer: {
    backgroundColor: '#e3f2fd',
    borderRadius: 12,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  weatherIcon: {
    width: 80,
    height: 80,
    resizeMode: 'contain'
  },
  temperatureContainer: {
    flex: 1
  },
  temperature: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 4
  },
  condition: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
    textTransform: 'capitalize'
  },
  feelsLike: {
    fontSize: 14,
    color: '#999'
  },
  rangeContainer: {
    backgroundColor: '#f0f4ff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3'
  },
  rangeText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500'
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12
  },
  detailItem: {
    flex: 1,
    minWidth: '48%',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#2196F3'
  },
  detailLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
    textTransform: 'uppercase',
    fontWeight: '600'
  },
  detailValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold'
  }
});

export default WeatherCard;
