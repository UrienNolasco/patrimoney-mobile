import { Stack, useRouter, useSegments } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { COLORS } from "../constants/colors"; 
import { AuthProvider, useAuth } from "../context/AuthContext";

const ProtectedLayout = () => {
  const { authState, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const isAuthenticated = authState.isAuthenticated;
    const inAuthGroup = segments[0] === "(auth)";
    const onAboutScreen = segments[0] === "about";


    if (!isAuthenticated && !inAuthGroup && !onAboutScreen) {
      router.replace("/about"); // <-- MUDANÇA PRINCIPAL AQUI
    }
    else if (isAuthenticated && (inAuthGroup || onAboutScreen)) {
      router.replace("/");
    }
  }, [isLoading, authState.isAuthenticated, segments]);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: COLORS.background,
        }}
      >
        <ActivityIndicator size="large" color={COLORS.primary || "#0000ff"} />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="about" />
    </Stack>
  );
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <ProtectedLayout />
    </AuthProvider>
  );
}
