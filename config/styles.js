import { StyleSheet } from "react-native";
import colors from "./colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.back,
    paddingTop: 50,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 10,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "600",
  },
  friendList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  friendCard: {
    backgroundColor: colors.border,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  friendInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  friendImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  friendDetails: {
    flex: 1,
  },
  friendName: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
  },
  balanceText: {
    fontSize: 14,
    marginTop: 5,
    fontWeight: "500",
  },
  balancePositive: {
    color: colors.success,
  },
  balanceNegative: {
    color: colors.primary,
  },
  selectButton: {
    backgroundColor: colors.accent,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 6,
    marginLeft: 10,
  },
  selectButtonText: {
    color: colors.back,
    fontWeight: "600",
    fontSize: 12,
  },
  formContainer: {
    backgroundColor: colors.border,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingTop: 30,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: colors.neutral,
    marginBottom: 5,
    fontWeight: "500",
  },
  input: {
    backgroundColor: colors.back,
    color: colors.text,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  submitButton: {
    flex: 0.48,
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButton: {
    flex: 0.48,
    backgroundColor: colors.neutral,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  centerText: {
    textAlign: "center",
    color: colors.text,
    fontWeight: "600",
  },
  radioGroup: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.text,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.accent,
  },
  radioLabel: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "500",
  },
});

export default styles;