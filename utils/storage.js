import AsyncStorage from "@react-native-async-storage/async-storage";

const FRIENDS_KEY = "split_n_bill_friends";

export const saveFriends = async (friends) => {
  try {
    await AsyncStorage.setItem(FRIENDS_KEY, JSON.stringify(friends));
  } catch (error) {
    console.error("Error saving friends:", error);
  }
};

export const getFriends = async () => {
  try {
    const data = await AsyncStorage.getItem(FRIENDS_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error retrieving friends:", error);
    return null;
  }
};

export const clearFriends = async () => {
  try {
    await AsyncStorage.removeItem(FRIENDS_KEY);
  } catch (error) {
    console.error("Error clearing friends:", error);
  }
};
