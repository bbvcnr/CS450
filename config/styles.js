import { StyleSheet } from "react-native";
import colors from "./colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.back,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    color: colors.text,
    textAlign: "center"
  },
  subtitle: {
    fontSize: 18,
    color: colors.text,
    textAlign: "center",
    marginTop: 18
  },
  logo: {
    width: 200,
    height: 200,
    marginTop: 20
  }
});

export default styles;