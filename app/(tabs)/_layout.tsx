import { FontAwesome } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Tabs } from "expo-router";
import React from "react";
import { COLORS } from "../../constants/colors"; // Ajuste o caminho se necessário

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true, // Ou false, se não quiser header em cada aba
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: COLORS.background,
        },
      }}
    >
      <Tabs.Screen
        name="resumo" // Corresponde ao arquivo app/(tabs)/index.tsx
        options={{
          title: "Resumo",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="rentabilidade" // Corresponde ao arquivo app/(tabs)/profile.tsx
        options={{
          title: "Rentabilidade",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="chart-bar" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="metas" // Corresponde ao arquivo app/(tabs)/profile.tsx
        options={{
          title: "Metas",
          tabBarIcon: ({ color, size }) => (
            <Feather name="target" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile" // Corresponde ao arquivo app/(tabs)/profile.tsx
        options={{
          title: "Perfil",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
