import { Link } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import SafeScreen from "../../components/SafeScreen";
import { COLORS } from "../../constants/colors";
import { useAuth } from "../../context/AuthContext";

const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSignIn = async () => {
    if (loading) return;
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
      <View style={styles.container}>
        <Text style={styles.title}>Acesse sua Conta</Text>

        <TextInput
          style={styles.input}
          placeholder="seu@email.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor={COLORS.primary}
        />
        <TextInput
          style={styles.input}
          placeholder="Sua senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor={COLORS.primary}
        />

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
      </View>
    </SafeScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: COLORS.text,
    textAlign: "center",
    marginBottom: 40,
  },
  input: {
    height: 50,
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    color: COLORS.text,
    backgroundColor: COLORS.background,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 50,
  },
  buttonText: { color: "#FFFFFF", fontSize: 18, fontWeight: "bold" },
  footer: { flexDirection: "row", justifyContent: "center", marginTop: 20 },
  footerText: { color: COLORS.text, fontSize: 16 },
  linkText: { color: COLORS.primary, fontSize: 16, fontWeight: "bold" },
});

export default SignInScreen;
