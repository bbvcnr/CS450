import { View, Text, TextInput, TouchableOpacity, Modal, Image } from "react-native";
import { useState, useEffect } from "react";
import styles from "../config/styles";

export default function SplitBillForm({ visible, friend, onClose, onSplit }) {
  const [billTotal, setBillTotal] = useState("");
  const [userExpense, setUserExpense] = useState("");
  const [paidBy, setPaidBy] = useState("user");

  useEffect(() => {
    if (visible) {
      setBillTotal("");
      setUserExpense("");
      setPaidBy("user");
    }
  }, [visible]);

  const friendExpense = billTotal
    ? (parseFloat(billTotal) - parseFloat(userExpense || 0)).toFixed(2)
    : "0.00";

  const handleSplit = () => {
    const total = parseFloat(billTotal);
    const user = parseFloat(userExpense) || 0;

    if (!billTotal || isNaN(total) || total <= 0) {
      alert("Please enter a valid bill amount");
      return;
    }

    if (user < 0 || user > total) {
      alert("Your expense must be between 0 and the bill total");
      return;
    }

    const friendExp = total - user;

    let balanceChange = 0;

    if (paidBy === "user") {
      // User paid the full bill, so friend owes user the friend's share
      balanceChange = friendExp;
    } else {
      // Friend paid the full bill, so user owes friend the user's share
      balanceChange = -user;
    }

    onSplit(friend.id, balanceChange);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          justifyContent: "flex-end",
        }}
      >
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Split a bill with {friend?.name}</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Bill value</Text>
            <TextInput
              style={styles.input}
              placeholder="0"
              placeholderTextColor="#999"
              value={billTotal}
              onChangeText={setBillTotal}
              keyboardType="decimal-pad"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Your expense</Text>
            <TextInput
              style={styles.input}
              placeholder="0"
              placeholderTextColor="#999"
              value={userExpense}
              onChangeText={setUserExpense}
              keyboardType="decimal-pad"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              {friend?.name}'s expense: ${friendExpense}
            </Text>
          </View>

          <Text style={styles.label} style={{ marginTop: 15, marginBottom: 10 }}>
            Who is paying the bill?
          </Text>

          <View style={styles.radioGroup}>
            <TouchableOpacity
              style={styles.radioOption}
              onPress={() => setPaidBy("user")}
            >
              <View style={styles.radioCircle}>
                {paidBy === "user" && <View style={styles.radioInner} />}
              </View>
              <Text style={styles.radioLabel}>You</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.radioOption}
              onPress={() => setPaidBy("friend")}
            >
              <View style={styles.radioCircle}>
                {paidBy === "friend" && <View style={styles.radioInner} />}
              </View>
              <Text style={styles.radioLabel}>{friend?.name}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonGroup}>
            <TouchableOpacity style={styles.submitButton} onPress={handleSplit}>
              <Text style={styles.centerText}>SPLIT BILL</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.centerText}>CLOSE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
