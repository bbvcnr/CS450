import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Alert
} from 'react-native';
import PropTypes from 'prop-types';

/**
 * SearchWeather Component
 * Provides input field and search button for weather lookup
 */
const SearchWeather = ({ onSearch, isLoading = false }) => {
  const [cityInput, setCityInput] = useState('');
  const [inputError, setInputError] = useState('');

  const handleSearch = () => {
    const trimmedCity = cityInput.trim();

    // Validation
    if (!trimmedCity) {
      setInputError('Please enter a city name');
      Alert.alert('Empty Input', 'Please enter a city name');
      return;
    }

    if (trimmedCity.length < 2) {
      setInputError('City name must be at least 2 characters');
      Alert.alert('Invalid Input', 'City name must be at least 2 characters');
      return;
    }

    if (trimmedCity.length > 50) {
      setInputError('City name is too long');
      Alert.alert('Invalid Input', 'City name must be less than 50 characters');
      return;
    }

    // Reset error and trigger search
    setInputError('');
    onSearch(trimmedCity);
  };

  const handleKeyPress = ({ nativeEvent }) => {
    if (nativeEvent.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weather Forecast</Text>
      <Text style={styles.subtitle}>Enter city name and press search button</Text>

      <View style={styles.searchContainer}>
        <TextInput
          style={[styles.input, inputError && styles.inputError]}
          placeholder="Enter city name..."
          placeholderTextColor="#999"
          value={cityInput}
          onChangeText={(text) => {
            setCityInput(text);
            setInputError('');
          }}
          onSubmitEditing={handleSearch}
          onKeyPress={handleKeyPress}
          editable={!isLoading}
          maxLength={50}
          accessible={true}
          accessibilityLabel="City name input field"
        />

        <TouchableOpacity
          style={[styles.searchButton, isLoading && styles.searchButtonDisabled]}
          onPress={handleSearch}
          disabled={isLoading}
          accessible={true}
          accessibilityLabel="Search weather button"
          accessibilityRole="button"
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.searchButtonText}>SEARCH</Text>
          )}
        </TouchableOpacity>
      </View>

      {inputError ? <Text style={styles.errorText}>{inputError}</Text> : null}
    </View>
  );
};

SearchWeather.propTypes = {
  onSearch: PropTypes.func.isRequired,
  isLoading: PropTypes.bool
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
    fontStyle: 'italic'
  },
  searchContainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center'
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#000'
  },
  inputError: {
    borderColor: '#d32f2f',
    backgroundColor: '#ffebee'
  },
  searchButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    minWidth: 100
  },
  searchButtonDisabled: {
    opacity: 0.6,
    backgroundColor: '#90CAF9'
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 12,
    marginTop: 8,
    textAlign: 'center'
  }
});

export default SearchWeather;
