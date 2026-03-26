import React, { useState } from 'react';
import { StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import ProfileCard from './components/ProfileCard';
import profileConfig from './profileConfig.json';
import skillsData from './skills.json';

/**
 * Main App Component
 * 
 * Refactored for better maintainability:
 * - Extracted components (Avatar, SkillBadge, ProfileCard)
 * - Centralized configuration (profileConfig.json)
 * - Added validation with fallbacks (validators.js)
 * - Separated concerns into modular pieces
 * - Added error handling for image failures
 * - Type safety with PropTypes
 */
export default function App() {
  const [avatarError, setAvatarError] = useState(false);

  const handleAvatarError = (error) => {
    console.warn('Failed to load avatar image:', error.message);
    setAvatarError(true);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <ProfileCard
          profileData={profileConfig}
          skillsData={skillsData}
          onImageError={handleAvatarError}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f0f0f0'
  },
  container: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center'
  }
});