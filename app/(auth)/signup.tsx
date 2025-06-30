import { Feather } from "@expo/vector-icons";
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
import SafeScreen from "../../components/SafeScreen";
import { COLORS } from "../../constants/colors";
import { useAuth } from "../../context/AuthContext";

const authImage = require("../../assets/images/authImage.svg");

const SignUpScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const handleSignUp = async () => {
    if (loading) return;
    setLoading(true);

    const result = await register({ name, email, password });

    if (!result.success) {
      Alert.alert(
        "Erro no Cadastro",
        result.error || "Não foi possível criar a conta."
      );
    }
    // Em caso de sucesso, o redirecionamento é feito pelo _layout.tsx
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
            <Text style={styles.title}>Crie sua Conta</Text>

            <Text style={styles.label}>Nome Completo</Text>
            <TextInput
              style={styles.input}
              placeholder="Seu nome completo"
              value={name}
              keyboardType="default"
              onChangeText={setName}
              placeholderTextColor={COLORS.textSecondary}
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="seu@email.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor={COLORS.textSecondary}
            />

            <Text style={styles.label}>Senha</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Sua senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!isPasswordVisible}
                autoCapitalize="none"
                placeholderTextColor={COLORS.textSecondary}
              />
              <Pressable onPress={() => setPasswordVisible(!isPasswordVisible)}>
                <Feather
                  name={isPasswordVisible ? "eye" : "eye-off"} // <-- NOVO: Ícone dinâmico
                  size={22}
                  color={COLORS.textPrimary}
                  style={styles.eyeIcon}
                />
              </Pressable>
            </View>

            <Pressable
              style={styles.button}
              onPress={handleSignUp}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.buttonText}>Cadastrar</Text>
              )}
            </Pressable>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Já tem uma conta?</Text>
              <Link href="/signin" asChild>
                <Pressable>
                  <Text style={styles.linkText}> Faça Login</Text>
                </Pressable>
              </Link>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeScreen>
  );
};

// Use os mesmos estilos do SignIn
const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 24,
    marginTop: -80,
    zIndex: 1, // Mantemos o zIndex da solução anterior
  },
  image: {
    width: "100%",
    height: "48%",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: COLORS.textPrimary,
    marginBottom: 30,
  },
  input: {
    height: 50,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.textPrimary,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: COLORS.textPrimary,
    fontSize: 16,
  },
  button: {
    backgroundColor: COLORS.card,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 50,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: COLORS.textPrimary,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  // NOVO: Estilo para o input de senha dentro do novo container
  passwordInput: {
    flex: 1, // Ocupa todo o espaço, empurrando o ícone para a direita
    height: 50,
    paddingHorizontal: 10,
    color: COLORS.textPrimary,
    fontSize: 16,
  },
  // NOVO: Estilo para o ícone
  eyeIcon: {
    padding: 10, // Aumenta a área de toque
  },
  buttonText: { color: "#FFFFFF", fontSize: 18, fontWeight: "bold" },
  footer: { flexDirection: "row", justifyContent: "center", marginTop: 20 },
  footerText: { color: COLORS.textSecondary, fontSize: 16 },
  linkText: { color: COLORS.textPrimary, fontSize: 16, fontWeight: "bold" },
});

export default SignUpScreen;
