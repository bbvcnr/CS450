import { View, Text, Image, useWindowDimensions } from "react-native";
import { StatusBar } from "expo-status-bar";
import styles from "./config/styles";

export default function App() {
  const { width, height } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.title}>Sarajevo School of</Text>
      <Text style={styles.title}>Science and Technology</Text>
      <Image source={require("./assets/splash.png")} style={styles.logo} />
      <Text style={styles.subtitle}>React Native with Expo</Text>
      <Text style={styles.subtitle}>Width: {Math.round(width)}, Height: {Math.round(height)}</Text>
    </View>
  );
}