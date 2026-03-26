import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { getLevelEmoji } from '../validators';

/**
 * SkillBadge component
 * Displays individual skill with level indicator and color
 */
const SkillBadge = ({ 
  skill, 
  level, 
  color 
}) => {
  const emoji = getLevelEmoji(level);

  return (
    <View style={[styles.skillBadge, { backgroundColor: color }]}>
      <Text style={styles.skillText}>
        {skill} {emoji}
      </Text>
    </View>
  );
};

SkillBadge.propTypes = {
  skill: PropTypes.string.isRequired,
  level: PropTypes.oneOf(['beginner', 'intermediate', 'advanced']).isRequired,
  color: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  skillBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 8
  },
  skillText: {
    fontWeight: 'bold',
    fontSize: 14
  }
});

export default SkillBadge;
