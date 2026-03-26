import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  SafeAreaView,
  ScrollView
} from 'react-native';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import AddItemForm from './AddItemForm';
import ShoppingListItem from './ShoppingListItem';

/**
 * ShoppingList component
 * Main container managing the shopping list state and logic
 * Starts with empty list as per requirements
 */
const ShoppingList = ({ title = 'SHOPPING LIST' }) => {
  const [items, setItems] = useState([]);

  /**
   * Add a new item to the shopping list
   */
  const handleAddItem = useCallback((itemText) => {
    const newItem = {
      id: uuidv4(),
      text: itemText,
      isDone: false,
      createdAt: new Date().toISOString()
    };
    setItems(prevItems => [newItem, ...prevItems]);
  }, []);

  /**
   * Toggle the done status of an item
   */
  const handleToggleDone = useCallback((itemId) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId
          ? { ...item, isDone: !item.isDone }
          : item
      )
    );
  }, []);

  /**
   * Delete an item from the shopping list
   */
  const handleDeleteItem = useCallback((itemId) => {
    setItems(prevItems => prevItems.filter(item => item.id !== itemId));
  }, []);

  /**
   * Calculate statistics
   */
  const totalItems = items.length;
  const completedItems = items.filter(item => item.isDone).length;

  /**
   * Render each list item
   */
  const renderItem = ({ item }) => (
    <ShoppingListItem
      id={item.id}
      text={item.text}
      isDone={item.isDone}
      onToggleDone={handleToggleDone}
      onDelete={handleDeleteItem}
    />
  );

  return (
    <View style={styles.container}>
      {/* Form to add new items */}
      <AddItemForm onAddItem={handleAddItem} />

      {/* Title */}
      <Text style={styles.title}>{title}</Text>

      {/* List of items */}
      {totalItems > 0 ? (
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          scrollEnabled={false}
          accessibilityLabel="Shopping list items"
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No items yet. Add one to get started!</Text>
        </View>
      )}

      {/* Statistics footer */}
      {totalItems > 0 && (
        <View style={styles.statsContainer}>
          <Text style={styles.statsText}>
            {completedItems} of {totalItems} completed
          </Text>
        </View>
      )}
    </View>
  );
};

ShoppingList.propTypes = {
  title: PropTypes.string
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 16
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottomVertical: 16,
    marginBottom: 16,
    color: '#333'
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    fontStyle: 'italic',
    textAlign: 'center'
  },
  statsContainer: {
    marginTopVertical: 16,
    marginTop: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    alignItems: 'center'
  },
  statsText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500'
  }
});

export default ShoppingList;
