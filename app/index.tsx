import { useAuth } from "@/context/AuthContext";
import { Link } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Index() {
  const { logout } = useAuth();
  const handleSignIn = async () => {
    const result = await logout();
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Link href={"/about"}>About Page</Link>
      <Button onPress={handleSignIn} title="Logout" />
    </View>
  );
}
