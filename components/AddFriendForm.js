import { View, Text, TextInput, TouchableOpacity, Modal } from "react-native";
import { useState } from "react";
import styles from "../config/styles";

export default function AddFriendForm({ visible, onClose, onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  const handleAddFriend = () => {
    if (name.trim()) {
      const id = Math.floor(Math.random() * 1000000);
      const imageUrl = image.trim()
        ? image
        : `https://i.pravatar.cc/48?u=${id}`;

      onAddFriend({
        id,
        name: name.trim(),
        image: imageUrl,
        balance: 0,
      });

      setName("");
      setImage("");
    }
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
          <Text style={styles.formTitle}>Add new friend</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter friend's name"
              placeholderTextColor="#999"
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Image (optional)</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter image URL"
              placeholderTextColor="#999"
              value={image}
              onChangeText={setImage}
            />
          </View>

          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleAddFriend}
            >
              <Text style={styles.centerText}>ADD FRIEND</Text>
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
