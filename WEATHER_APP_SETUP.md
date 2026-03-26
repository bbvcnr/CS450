# 🌤️ Week 04 Weather App - Quick Setup Guide

## Step-by-Step Setup

### Step 1: Get Your API Key (5 minutes)

1. **Go to OpenWeatherMap**
   - URL: [https://openweathermap.org/api](https://openweathermap.org/api)

2. **Create FREE Account**
   - Click "Sign Up"
   - Enter email, password, username
   - Verify email
   - Accept terms

3. **Generate API Key**
   - Login to your account
   - Go to → API keys (in your account menu)
   - Your default API key is already there
   - Copy it (looks like: `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6`)

### Step 2: Add API Key to App

1. **Open File**
   - Path: `services/weatherService.js`

2. **Find This Line** (Line 12)
   ```javascript
   const API_KEY = 'YOUR_API_KEY_HERE';
   ```

3. **Replace with Your Key**
   ```javascript
   const API_KEY = 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6'; // Your actual key
   ```

4. **Save File** (Ctrl+S)

### Step 3: Install Dependencies

```bash
npm install
```

### Step 4: Run the App

```bash
npm run web
```

Or on specific platform:
```bash
npm run android
npm run ios
```

### Step 5: Test the App

1. **Wait for app to load** (usually 10-15 seconds)
2. **Enter a city name** (e.g., "London", "New York", "Tokyo")
3. **Click SEARCH button** or press Enter
4. **See weather data** displayed in card

## Common Issues & Fixes

### Issue: Blank screen / App not loading
**Fix:**
- Open browser console (F12) → Check for errors
- Clear cache: `npm start` → press 'c' → Enter
- Restart: `npm run web`

### Issue: "API Key Not Configured" alert
**Fix:**
- Open `services/weatherService.js`
- Check line 12
- Make sure you replaced `YOUR_API_KEY_HERE` with your actual key
- Save file
- Refresh app (press R in terminal)

### Issue: "City not found" error for valid city
**Fix:**
- Check spelling (cases don't matter)
- Try full name with country: "London, GB" or "London, UK"
- Some cities have multiple entries (try adding country code)

### Issue: "Invalid API response" error
**Fix:**
- Verify your API key is correct
- Wait 5-10 minutes (new keys take time to activate)
- Generate a new key from OpenWeatherMap dashboard

### Issue: "401 Unauthorized" error
**Fix:**
- Your API key is invalid or expired
- Generate a new key from: [https://openweathermap.org/api](https://openweathermap.org/api)
- Replace in `weatherService.js`

### Issue: App loads but no button click response
**Fix:**
- Check browser console for errors (F12)
- Make sure AsyncStorage is working (web platform should work)
- Try searching with a different browser

## How It Works

```
1. You enter city name and click SEARCH
2. App checks if city data is cached locally
   ✓ If cached → Shows instantly (fast!)
   ✗ If not cached → Fetches from API
3. API returns weather data
4. App saves data to local cache
5. Shows weather card with:
   - Current temperature
   - Weather condition + icon
   - Min/Max temps
   - Humidity, wind speed, pressure, etc.
```

## Features

✅ **Search by city name** - Type any city and search
✅ **Display weather** - Current temp, condition, icon
✅ **Local cache** - Stores data for 24 hours
✅ **Refresh button** - Get fresh data from API
✅ **Error handling** - Shows helpful messages
✅ **Input validation** - Checks for valid input
✅ **Loading indicator** - Shows when fetching

## Weather Details Shown

| Detail | Example |
|--------|---------|
| City | London, GB |
| Temperature | 12°C |
| Condition | Overcast clouds |
| Feels Like | 11°C |
| Min/Max | 8°C - 12°C |
| Humidity | 86% |
| Wind Speed | 3.1 m/s |
| Pressure | 1022 hPa |
| Visibility | 10.0 km |
| Cloudiness | 100% |

## Test Cities

Try these cities to test:

✓ London
✓ New York
✓ Tokyo
✓ Paris
✓ Berlin
✓ Sydney
✓ Toronto
✓ Moscow

Invalid for testing (should show error):
✗ XYZ123 (doesn't exist)
✗ ASDF (doesn't exist)
✗ (empty input)

## FAQ

**Q: Why is my search showing cached data?**
A: If you searched for the same city before, we show cached data instantly. Click "Refresh" button to get live data.

**Q: How long is data cached?**
A: 24 hours. After that, next search will fetch fresh data.

**Q: Does it work offline?**
A: Yes! Cached cities work offline. New cities require internet.

**Q: Can I have multiple cities cached?**
A: Yes! Each city is cached separately. Search different cities to build your cache.

**Q: What if API stops working?**
A: We fall back to cached data. The cache badge shows it's not live data.

**Q: Where is data stored?**
A: On your device locally using AsyncStorage (not sent to any server).

## Useful Links

- **OpenWeatherMap API:** https://openweathermap.org/api
- **API Documentation:** https://openweathermap.org/current
- **AsyncStorage Docs:** https://react-native-async-storage.github.io/
- **React Native Docs:** https://reactnative.dev/

## Need Help?

1. **Check console for errors** - F12 → Console tab
2. **Read error messages** - They're helpful!
3. **Verify API key** - Make sure it's in `weatherService.js`
4. **Restart app** - Sometimes fixes unexpected issues
5. **Clear cache** - Delete localStorage data if needed

---

## Ready?

Once your API key is configured:

```bash
npm install
npm run web
```

Enjoy your weather app! 🌤️
