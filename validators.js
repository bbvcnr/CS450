/**
 * Validators for skills data and user inputs
 * Provides validation functions and fallback values for safe data handling
 */

// Valid skill levels
const VALID_LEVELS = ['beginner', 'intermediate', 'advanced'];

// Default fallback values
const DEFAULTS = {
  skill: 'Unknown Skill',
  level: 'intermediate',
  color: '#808080'
};

// Emoji mapping for skill levels
const LEVEL_EMOJIS = {
  beginner: '👶',
  intermediate: '👍',
  advanced: '💪'
};

/**
 * Validate and sanitize a single skill item
 * @param {Object} item - The skill item to validate
 * @returns {Object} Validated skill object with fallbacks
 */
export const validateSkillItem = (item) => {
  if (!item || typeof item !== 'object') {
    return { ...DEFAULTS };
  }

  const skill = typeof item.skill === 'string' ? item.skill.trim() : DEFAULTS.skill;
  const level = VALID_LEVELS.includes(item.level) ? item.level : DEFAULTS.level;
  const color = isValidColor(item.color) ? item.color : DEFAULTS.color;

  return {
    skill: skill || DEFAULTS.skill,
    level,
    color
  };
};

/**
 * Validate an array of skill items
 * @param {Array} skills - The skills array to validate
 * @returns {Array} Array of validated skill objects
 */
export const validateSkillsArray = (skills) => {
  if (!Array.isArray(skills)) {
    console.warn('skills data is not an array, returning empty array');
    return [];
  }

  return skills
    .filter(item => item) // Filter out null/undefined
    .map(validateSkillItem);
};

/**
 * Check if a value is a valid hex color
 * @param {string} color - The color value to check
 * @returns {boolean} True if valid color format
 */
const isValidColor = (color) => {
  if (typeof color !== 'string') return false;
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
};

/**
 * Get emoji for a skill level
 * @param {string} level - The skill level
 * @returns {string} The appropriate emoji
 */
export const getLevelEmoji = (level) => {
  return LEVEL_EMOJIS[level] || LEVEL_EMOJIS[DEFAULTS.level];
};

/**
 * Validate avatar URL
 * @param {string} url - The URL to validate
 * @returns {boolean} True if URL looks valid
 */
export const isValidUrl = (url) => {
  if (typeof url !== 'string') return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Get extension for profile config
 * @param {Object} config - The profile config object
 * @returns {Object} Validated config with fallbacks
 */
export const validateProfileConfig = (config) => {
  if (!config || typeof config !== 'object') {
    return {
      profile: {
        name: 'Unknown',
        bio: '',
        avatarUrl: '',
        avatarFallbackInitials: '?'
      }
    };
  }

  const profile = config.profile || {};
  return {
    profile: {
      name: typeof profile.name === 'string' ? profile.name : 'Unknown',
      bio: typeof profile.bio === 'string' ? profile.bio : '',
      avatarUrl: typeof profile.avatarUrl === 'string' ? profile.avatarUrl : '',
      avatarFallbackInitials: typeof profile.avatarFallbackInitials === 'string' 
        ? profile.avatarFallbackInitials 
        : profile.name?.substring(0, 2).toUpperCase() || '?'
    }
  };
};
