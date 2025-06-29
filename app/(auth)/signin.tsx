import { Image } from "expo-image";
import { Link } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { Feather } from "@expo/vector-icons";
import SafeScreen from "../../components/SafeScreen";
import { COLORS } from "../../constants/colors";
import { useAuth } from "../../context/AuthContext";

const authImage = require("../../assets/images/authImage.svg");

const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setPasswordVisible] = useState(false); // <-- NOVO: Estado para visibilidade
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSignIn = async () => {
    // ... sua função handleSignIn continua igual ...
    if (!email || !password) {
      Alert.alert("Campos Vazios", "Por favor, preencha o email e a senha.");
      return;
    }
    setLoading(true);
    const result = await login({ email, password });
    if (!result.success) {
      Alert.alert(
        "Erro no Login",
        result.error || "Não foi possível fazer o login."
      );
    }
    setLoading(false);
  };

  return (
    <SafeScreen>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.pageContainer}>
          <Image
            style={styles.image}
            source={authImage}
            contentFit="cover"
            contentPosition="bottom"
          />

          <ScrollView
            style={styles.formContainer}
            contentContainerStyle={{ paddingBottom: 40 }}
            keyboardShouldPersistTaps="handled"
          >
            <Text style={styles.title}>Acesse sua conta</Text>

            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="seu@email.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor={COLORS.secondary}
            />

            {/* --- Bloco da Senha Refatorado --- */}
            <Text style={styles.label}>Senha</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Sua senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!isPasswordVisible}
                autoCapitalize="none"
                placeholderTextColor={COLORS.secondary}
              />
              <Pressable onPress={() => setPasswordVisible(!isPasswordVisible)}>
                <Feather
                  name={isPasswordVisible ? "eye" : "eye-off"} // <-- NOVO: Ícone dinâmico
                  size={22}
                  color={COLORS.secondary}
                  style={styles.eyeIcon}
                />
              </Pressable>
            </View>
            {/* --- Fim do Bloco da Senha --- */}

            <Pressable
              style={styles.button}
              onPress={handleSignIn}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.buttonText}>Entrar</Text>
              )}
            </Pressable>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Não tem uma conta?</Text>
              <Link href="/signup" asChild>
                <Pressable>
                  <Text style={styles.linkText}> Cadastre-se</Text>
                </Pressable>
              </Link>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeScreen>
  );
};

// --- Estilos com as novas adições ---
const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  image: {
    width: "100%",
    height: "50%",
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 24,
    marginTop: -45,
    zIndex: 1, // Mantemos o zIndex da solução anterior
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    color: COLORS.secondary,
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: COLORS.text,
    fontSize: 16,
  },
  // NOVO: Container para agrupar o input de senha e o ícone
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
    marginBottom: 20,
  },
  // NOVO: Estilo para o input de senha dentro do novo container
  passwordInput: {
    flex: 1, // Ocupa todo o espaço, empurrando o ícone para a direita
    height: 50,
    paddingHorizontal: 10,
    color: COLORS.text,
    fontSize: 16,
  },
  // NOVO: Estilo para o ícone
  eyeIcon: {
    padding: 10, // Aumenta a área de toque
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
    elevation: 3,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
    paddingBottom: 20,
  },
  footerText: {
    color: COLORS.text,
    fontSize: 16,
  },
  linkText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SignInScreen;
