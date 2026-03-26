import React, { useState } from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import PropTypes from 'prop-types';

/**
 * Avatar component with error handling and fallback
 * Displays user avatar with graceful fallback to initials on error
 */
const Avatar = ({ 
  source, 
  size = 150, 
  fallbackInitials = '?',
  onImageError = null
}) => {
  const [hasError, setHasError] = useState(false);

  const handleImageError = (error) => {
    console.warn('Avatar image failed to load:', error);
    setHasError(true);
    onImageError?.(error);
  };

  const borderRadius = size / 2;

  return (
    <View>
      {!hasError && source ? (
        <Image
          source={source}
          style={[
            styles.avatar,
            {
              width: size,
              height: size,
              borderRadius
            }
          ]}
          resizeMode="cover"
          onError={handleImageError}
        />
      ) : (
        <View
          style={[
            styles.fallback,
            {
              width: size,
              height: size,
              borderRadius
            }
          ]}
        >
          <Text style={styles.fallbackText}>{fallbackInitials}</Text>
        </View>
      )}
    </View>
  );
};

Avatar.propTypes = {
  source: PropTypes.shape({
    uri: PropTypes.string
  }),
  size: PropTypes.number,
  fallbackInitials: PropTypes.string,
  onImageError: PropTypes.func
};

const styles = StyleSheet.create({
  avatar: {
    borderWidth: 2,
    borderColor: '#eee',
    alignSelf: 'center'
  },
  fallback: {
    alignSelf: 'center',
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#999'
  },
  fallbackText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#666'
  }
});

export default Avatar;
