import { Href, Stack, useRouter, useSegments } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { COLORS } from "../constants/colors";
import { AuthProvider, useAuth } from "../context/AuthContext";
import Toast from "react-native-toast-message";

const ProtectedLayout = () => {
  const { authState, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const isAuthenticated = authState.isAuthenticated;
    const inAuthGroup = segments[0] === "(auth)";


    if (!isAuthenticated && !inAuthGroup) {
      router.replace("/signin");
    }
    else if (isAuthenticated && inAuthGroup) {
      router.replace("/(tabs)/resumo" as Href);
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
        <ActivityIndicator
          size="large"
          color={COLORS.textPrimary || "#0000ff"}
        />
      </View>
    );
  }


  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="about"
        options={{ headerShown: true, title: "Sobre" }}
      />
    </Stack>
  );
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <ProtectedLayout />
      <Toast />
    </AuthProvider>
  );
}
