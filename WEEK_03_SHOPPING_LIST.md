# Week 03 - Shopping List App

## Overview
Complete shopping list application built with React Native and Expo. Users can add items, mark them as done/not done, and remove items from the list. The app starts with an empty list as specified in the requirements.

## Features Implemented ✅

### 1. **Add Items Form**
- Input field with "new item" placeholder
- "ADD ITEM" button to add items to the list
- Input validation (non-empty, max 100 characters)
- Press Enter key to add item
- Clear input field after adding
- Accessibility labels and roles

### 2. **Shopping List Display**
- Title "SHOPPING LIST" centered at the top
- Displays all items in a scrollable list
- Stylized blue items matching the design mockup
- Empty state message when no items exist
- Statistics footer showing completed/total items

### 3. **Item Management**
- **Toggle Done/Incomplete:** Checkbox on each item to mark as done
  - Done items show strike-through text
  - Done items have reduced opacity
  - Visual feedback with styling changes
- **Delete Items:** ✕ button on each item to remove it
- All state managed with React hooks (useState, useCallback)

### 4. **Architecture**
- Modular component structure
- Proper separation of concerns
- State management with React hooks
- PropTypes for type safety
- Accessibility features

## Project Structure

```
profile-card-template/
├── App.js                          # Main app entry point
├── components/
│   ├── ShoppingList.js             # Main container component (state management)
│   ├── AddItemForm.js              # Form for adding new items
│   └── ShoppingListItem.js         # Individual list item component
├── package.json                    # Dependencies including uuid and prop-types
├── skills.json                     # Original profile data (unused for this app)
└── profileConfig.json              # Original profile config
```

## Component Details

### **ShoppingList.js** (Container)
- Manages all shopping list state
- Starts with empty array `[]`
- Handles add, toggle, and delete operations
- Renders AddItemForm and list of items
- Uses UUID v4 for unique item IDs

### **AddItemForm.js** (Form)
- Controlled input component
- Validates non-empty input
- Validates max length (100 characters)
- Shows alerts for validation errors
- Returns trimmed input to parent

### **ShoppingListItem.js** (List Item)
- Checkbox for toggling done status
- Delete button (✕) for removing item
- Styled text with strike-through when done
- Accessibility attributes (labels, roles)
- Visual feedback for different states

## Dependencies Added

```json
{
  "prop-types": "^15.8.1",    // Runtime type checking
  "uuid": "^9.0.0"             // Generate unique item IDs
}
```

## Styling

- **Color Scheme:**
  - List items: Cyan blue (#00BCD4)
  - Done items: Light cyan (#B3E5FC)
  - Add button: Blue (#2196F3)
  - Delete button: Red (#d32f2f)
  - Input: White with border

- **Typography:**
  - Title: 24px bold
  - Item text: 16px medium weight
  - Done items: Strike-through, reduced opacity

## Usage

```bash
# Install dependencies
npm install
# or
yarn install

# Run the app
npm start
# or on specific platform
npm run android
npm run ios
npm run web
```

## How It Works

1. **Adding Items:**
   - User types in the input field
   - Clicks "ADD ITEM" button or presses Enter
   - Validation checks for empty/too long input
   - New item added to top of list with unique UUID

2. **Toggling Done Status:**
   - Click checkbox on any item
   - Item visually changes (strike-through, opacity)
   - State updates immediately

3. **Deleting Items:**
   - Click ✕ button on any item
   - Item removed from list
   - State updates immediately

## Data Structure

Each item in the shopping list has:
```javascript
{
  id: "uuid-string",           // Unique identifier
  text: "Item description",    // User input
  isDone: false,               // Completion status
  createdAt: "ISO-8601-date"  // Timestamp
}
```

## Accessibility Features

- CheckBox components with accessibility labels
- TouchableOpacity with accessibility roles
- Proper accessibilityLabel attributes
- Semantic structure with role definitions

## Test Scenarios

✅ **Adding items:** Input validation works, items appear in list
✅ **Toggling done:** Checkbox updates visual state correctly
✅ **Deleting items:** Items removed from list when delete button pressed
✅ **Empty state:** Shows helpful message when no items
✅ **Input validation:** Rejects empty items with alert
✅ **Statistics:** Shows count of completed items

## Future Enhancements

- Persist items to AsyncStorage (local storage)
- Edit existing items
- Categories/groups for items
- Priority levels
- Due dates
- Share shopping list
- Dark mode theme
- Multi-language support

## Branch Information

- **Branch:** `week-03`
- **Status:** Complete
- **All requirements met:** ✅

## Notes

- Starts with empty list (no initial data)
- Items are stored in component state only (clears on app reload)
- To persist data, integrate AsyncStorage in future versions
- All components use functional components with hooks
- PropTypes provide runtime validation
- UUID ensures unique item IDs

---

**Week 03 Task Complete** ✨
