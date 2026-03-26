import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';

/**
 * Individual shopping list item component
 * Displays item with checkbox toggle and delete button
 */
const ShoppingListItem = ({
  id,
  text,
  isDone,
  onToggleDone,
  onDelete
}) => {
  return (
    <View style={[styles.itemContainer, isDone && styles.itemContainerDone]}>
      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={() => onToggleDone(id)}
        accessible={true}
        accessibilityLabel={`Toggle ${text}`}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: isDone }}
      >
        <View style={[styles.checkbox, isDone && styles.checkboxDone]}>
          {isDone && <Text style={styles.checkmark}>✓</Text>}
        </View>
      </TouchableOpacity>

      <Text
        style={[styles.itemText, isDone && styles.itemTextDone]}
        numberOfLines={1}
      >
        {text}
      </Text>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onDelete(id)}
        accessible={true}
        accessibilityLabel={`Delete ${text}`}
        accessibilityRole="button"
      >
        <Text style={styles.deleteText}>✕</Text>
      </TouchableOpacity>
    </View>
  );
};

ShoppingListItem.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  isDone: PropTypes.bool.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00BCD4',
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginVertical: 4,
    borderRadius: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2
  },
  itemContainerDone: {
    opacity: 0.7,
    backgroundColor: '#B3E5FC'
  },
  checkboxContainer: {
    marginRight: 12,
    padding: 4
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  checkboxDone: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50'
  },
  checkmark: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold'
  },
  itemText: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    fontWeight: '500'
  },
  itemTextDone: {
    textDecorationLine: 'line-through',
    color: '#666',
    fontWeight: '400'
  },
  deleteButton: {
    padding: 8,
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  deleteText: {
    fontSize: 20,
    color: '#d32f2f',
    fontWeight: 'bold'
  }
});

export default ShoppingListItem;
