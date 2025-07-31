import { Href, Stack, useRouter, useSegments } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import Toast, {
  ErrorToast,
  SuccessToast,
  ToastConfigParams,
} from "react-native-toast-message";

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

    if (!isAuthenticated && !inAuthGroup) {
      router.replace("/signin");
    } else if (isAuthenticated && inAuthGroup) {
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

const toastConfig = {
  success: (props: ToastConfigParams<any>) => (
    <SuccessToast
      {...props}
      style={{
        backgroundColor: COLORS.card,
        borderLeftColor: COLORS.positive,
      }}
      text1Style={{
        color: COLORS.textPrimary,
        fontSize: 16, 
        fontWeight: "bold",
      }}
      text2Style={{
        color: COLORS.textSecondary,
        fontSize: 14,
      }}
    />
  ),

  error: (props: ToastConfigParams<any>) => (
    <ErrorToast
      {...props}

      style={{
        backgroundColor: COLORS.card,
        borderLeftColor: COLORS.negative,
      }}
      text1Style={{
        color: COLORS.textPrimary,
        fontSize: 16,
        fontWeight: "bold",
      }}
      text2Style={{
        color: COLORS.textSecondary,
        fontSize: 14,
      }}
    />
  ),
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <ProtectedLayout />
      <Toast config={toastConfig} />
    </AuthProvider>
  );
}
