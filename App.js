import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import ShoppingList from './components/ShoppingList';

/**
 * Shopping List App
 * 
 * Week 03 Task - Build a shopping list application
 * Features:
 * - Add items to the list with form input
 * - Toggle items as done/not done
 * - Remove items from the list
 * - Starts with empty list
 */
export default function App() {
  return (
    <SafeAreaView style={styles.screen}>
      <ShoppingList title="SHOPPING LIST" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  }
});