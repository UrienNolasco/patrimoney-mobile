import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Link } from "expo-router";
import SafeScreen from "../components/SafeScreen";
import { COLORS } from "../constants/colors";

const AboutScreen = () => {
  return (
    <SafeScreen>
      <View style={styles.container}>
        <Text style={styles.logo}>Seu Logo Aqui</Text>
        <Text style={styles.title}>Bem-vindo ao [Nome do App]</Text>
        <Text style={styles.subtitle}>
          Sua solução completa para [o que seu app faz].
        </Text>

        <Link href="/signin" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Começar</Text>
          </Pressable>
        </Link>
      </View>
    </SafeScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: COLORS.background,
  },
  logo: {
    fontSize: 48,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.text,
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: COLORS.text,
    textAlign: "center",
    marginBottom: 60,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 10,
    elevation: 3, // Sombra para Android
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default AboutScreen;
