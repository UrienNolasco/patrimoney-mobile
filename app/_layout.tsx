import { Href, Stack, useRouter, useSegments } from "expo-router";
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
    // O primeiro segmento agora pode ser '(auth)' ou '(tabs)'
    const inAuthGroup = segments[0] === "(auth)";

    // Se não estiver autenticado E não estiver nas telas de auth,
    // redirecione para o signin.
    if (!isAuthenticated && !inAuthGroup) {
      // É mais comum redirecionar para a tela de login
      router.replace("/signin");
    }
    // Se estiver autenticado E estiver em uma tela de auth,
    // redirecione para a tela principal (home/index dentro das abas).
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

  // Este Stack agora serve como um container para os diferentes fluxos (auth ou tabs).
  // O Expo Router vai renderizar o layout correto (de auth ou de tabs)
  // baseado na URL atual.
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* A tela do grupo (tabs) não precisa de header aqui, pois o layout das abas já controla isso. */}
      <Stack.Screen name="(tabs)" />
      {/* Você ainda pode ter telas fora das abas, como a "about" */}
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
    </AuthProvider>
  );
}
