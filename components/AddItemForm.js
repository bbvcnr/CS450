import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert
} from 'react-native';
import PropTypes from 'prop-types';

/**
 * AddItemForm component
 * Form to input new item and add it to the shopping list
 */
const AddItemForm = ({ onAddItem }) => {
  const [inputValue, setInputValue] = useState('');

  const handleAddItem = () => {
    const trimmedValue = inputValue.trim();

    // Validation: ensure item description is not empty
    if (!trimmedValue) {
      Alert.alert('Empty Item', 'Please enter an item description');
      return;
    }

    // Validation: limit item length
    if (trimmedValue.length > 100) {
      Alert.alert('Item Too Long', 'Please enter an item with less than 100 characters');
      return;
    }

    // Add the item
    onAddItem(trimmedValue);

    // Clear input
    setInputValue('');
  };

  const handleKeyPress = ({ nativeEvent }) => {
    if (nativeEvent.key === 'Enter') {
      handleAddItem();
    }
  };

  return (
    <View style={styles.formContainer}>
      <TextInput
        style={styles.input}
        placeholder="new item"
        placeholderTextColor="#999"
        value={inputValue}
        onChangeText={setInputValue}
        onSubmitEditing={handleAddItem}
        editable={true}
        maxLength={100}
        accessible={true}
        accessibilityLabel="Item input field"
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAddItem}
        accessible={true}
        accessibilityLabel="Add item button"
        accessibilityRole="button"
      >
        <Text style={styles.addButtonText}>ADD ITEM</Text>
      </TouchableOpacity>
    </View>
  );
};

AddItemForm.propTypes = {
  onAddItem: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  formContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 8
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#000'
  },
  addButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14
  }
});

export default AddItemForm;
