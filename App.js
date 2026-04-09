import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import FriendsList from "./components/FriendsList";
import AddFriendForm from "./components/AddFriendForm";
import SplitBillForm from "./components/SplitBillForm";
import { saveFriends, getFriends } from "./utils/storage";

const INITIAL_DATA = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [friends, setFriends] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showSplitForm, setShowSplitForm] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadFriends();
  }, []);

  const loadFriends = async () => {
    try {
      const savedFriends = await getFriends();
      if (savedFriends) {
        setFriends(savedFriends);
      } else {
        setFriends(INITIAL_DATA);
        await saveFriends(INITIAL_DATA);
      }
    } catch (error) {
      console.error("Error loading friends:", error);
      setFriends(INITIAL_DATA);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddFriend = async (newFriend) => {
    const updatedFriends = [...friends, newFriend];
    setFriends(updatedFriends);
    await saveFriends(updatedFriends);
    setShowAddForm(false);
  };

  const handleSelectFriend = (friend) => {
    setSelectedFriend(friend);
    setShowSplitForm(true);
  };

  const handleSplitBill = async (friendId, balanceChange) => {
    const updatedFriends = friends.map((friend) => {
      if (friend.id === friendId) {
        return {
          ...friend,
          balance: friend.balance + balanceChange,
        };
      }
      return friend;
    });

    setFriends(updatedFriends);
    await saveFriends(updatedFriends);
    setShowSplitForm(false);
    setSelectedFriend(null);
  };

  if (isLoading) {
    return null;
  }

  return (
    <>
      <StatusBar style="light" />
      <FriendsList
        friends={friends}
        onSelectFriend={handleSelectFriend}
        onAddFriend={() => setShowAddForm(true)}
      />
      <AddFriendForm
        visible={showAddForm}
        onClose={() => setShowAddForm(false)}
        onAddFriend={handleAddFriend}
      />
      {selectedFriend && (
        <SplitBillForm
          visible={showSplitForm}
          friend={selectedFriend}
          onClose={() => {
            setShowSplitForm(false);
            setSelectedFriend(null);
          }}
          onSplit={handleSplitBill}
        />
      )}
    </>
  );
}