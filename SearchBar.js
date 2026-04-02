import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';

const SearchBar = ({ value, onChangeText, onSearch, loading }) => {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter city name..."
          placeholderTextColor="#95a5a6"
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={onSearch}
          editable={!loading}
        />
        <TouchableOpacity
          style={[styles.searchButton, loading && styles.searchButtonDisabled]}
          onPress={onSearch}
          disabled={loading || value.trim() === ''}
        >
          <Text style={styles.searchButtonText}>
            {loading ? '...' : '🔍'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#2c3e50',
  },
  searchButton: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginLeft: 8,
    backgroundColor: '#3498db',
    borderRadius: 8,
  },
  searchButtonDisabled: {
    backgroundColor: '#bdc3c7',
  },
  searchButtonText: {
    fontSize: 18,
  },
});

export default SearchBar;
