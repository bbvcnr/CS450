import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import styles from "../config/styles";

export default function FriendsList({ friends, onSelectFriend, onAddFriend }) {
  const renderFriend = ({ item }) => {
    const balanceText =
      item.balance > 0
        ? `${item.name} owes you $${item.balance}`
        : item.balance < 0
          ? `You owe ${item.name} $${Math.abs(item.balance)}`
          : `You are even`;

    const balanceStyle =
      item.balance > 0
        ? styles.balancePositive
        : item.balance < 0
          ? styles.balanceNegative
          : {};

    return (
      <View style={styles.friendCard}>
        <View style={styles.friendInfo}>
          <Image source={{ uri: item.image }} style={styles.friendImage} />
          <View style={styles.friendDetails}>
            <Text style={styles.friendName}>{item.name}</Text>
            <Text style={[styles.balanceText, balanceStyle]}>{balanceText}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.selectButton}
          onPress={() => onSelectFriend(item)}
        >
          <Text style={styles.selectButtonText}>SELECT</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Split the Bill</Text>
        <TouchableOpacity style={styles.button} onPress={onAddFriend}>
          <Text style={styles.buttonText}>+ ADD FRIEND</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={friends}
        renderItem={renderFriend}
        keyExtractor={(item) => item.id.toString()}
        scrollEnabled={true}
        contentContainerStyle={styles.friendList}
      />
    </View>
  );
}
