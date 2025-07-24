import { useAuth } from "@/context/AuthContext";
import React from "react";
import { Button, Text, View } from "react-native";

const Profile = () => {
  const auth = useAuth();
  return (
    <View>
      <Text>Profile</Text>
      <Button
        title="Logout"
        onPress={() => {
          // Implement your logout logic here
          auth.logout();
        }}
      />
    </View>
  );
};

export default Profile;
