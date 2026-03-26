import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import Avatar from './Avatar';
import SkillBadge from './SkillBadge';
import { validateSkillsArray } from '../validators';

/**
 * ProfileCard component
 * Main card component displaying complete profile with avatar, bio, and skills
 * Handles data validation and error recovery
 */
const ProfileCard = ({ 
  profileData,
  skillsData = [],
  onImageError = null 
}) => {
  // Validate skills data on render
  const validatedSkills = useMemo(() => {
    return validateSkillsArray(skillsData);
  }, [skillsData]);

  if (!profileData || !profileData.profile) {
    return (
      <View style={styles.card}>
        <Text style={styles.errorText}>Profile data not available</Text>
      </View>
    );
  }

  const { name, bio, avatarUrl, avatarFallbackInitials } = profileData.profile;

  return (
    <View style={styles.card}>
      {/* Avatar Section */}
      <Avatar
        source={avatarUrl ? { uri: avatarUrl } : null}
        size={150}
        fallbackInitials={avatarFallbackInitials}
        onImageError={onImageError}
      />

      {/* Info Section */}
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>

        <Text style={styles.bio}>{bio}</Text>

        {/* Skills Section */}
        {validatedSkills.length > 0 ? (
          <View style={styles.skillList}>
            {validatedSkills.map((item, index) => (
              <SkillBadge
                key={index}
                skill={item.skill}
                level={item.level}
                color={item.color}
              />
            ))}
          </View>
        ) : (
          <Text style={styles.noSkillsText}>No skills available</Text>
        )}
      </View>
    </View>
  );
};

ProfileCard.propTypes = {
  profileData: PropTypes.shape({
    profile: PropTypes.shape({
      name: PropTypes.string,
      bio: PropTypes.string,
      avatarUrl: PropTypes.string,
      avatarFallbackInitials: PropTypes.string
    })
  }).isRequired,
  skillsData: PropTypes.arrayOf(
    PropTypes.shape({
      skill: PropTypes.string,
      level: PropTypes.string,
      color: PropTypes.string
    })
  ),
  onImageError: PropTypes.func
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    width: '100%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    paddingBottom: 10
  },
  infoContainer: {
    padding: 20,
    alignItems: 'center'
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center'
  },
  bio: {
    fontSize: 16,
    color: '#444',
    marginBottom: 20,
    lineHeight: 22,
    textAlign: 'center'
  },
  skillList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8
  },
  noSkillsText: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic'
  },
  errorText: {
    padding: 20,
    fontSize: 16,
    color: '#d32f2f',
    textAlign: 'center'
  }
});

export default ProfileCard;
