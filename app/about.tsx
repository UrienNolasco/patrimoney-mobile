import { Image } from "expo-image";
import { Link } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import SafeScreen from "../components/SafeScreen";
import { COLORS } from "../constants/colors";

const authImage = require("../assets/images/authImage.svg");

const AboutScreen = () => {
  return (
    <SafeScreen>
      <View style={styles.pageContainer}>
        <Image
          style={styles.image}
          source={authImage}
          contentFit="cover"
          contentPosition="bottom"
        />

        {/* O container de conteúdo agora organiza os itens de forma diferente */}
        <View style={styles.contentContainer}>
          {/* ---- PARTE DE CIMA DO CONTEÚDO ---- */}
          <View>
            <Text style={styles.title}>Bem-vindo ao PatriMoney</Text>
            <Text style={styles.subtitle}>
              Para você que está cansado de depender das corretoras para mostrar
              corretamente a evolução do seu patrimônio.
            </Text>
          </View>

          {/* ---- O SPACER (EMPILHADOR) ---- */}
          {/* Esta View vazia com flex: 1 ocupa todo o espaço restante */}
          <View style={{ flex: 1 }} />

          {/* ---- PARTE DE BAIXO DO CONTEÚDO ---- */}
          <Link href="/signin" asChild>
            <Pressable style={styles.button}>
              <Text style={styles.buttonText}>Começar</Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </SafeScreen>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  image: {
    width: "100%",
    height: "60%", // Você pode controlar a altura da imagem aqui
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24, // Padding nas laterais
    paddingBottom: 24, // Padding embaixo para o botão não colar na borda
    // A propriedade justifyContent foi removida para termos controle manual
  },
  title: {
    fontSize: 50, // Ajustei um pouco para caber melhor
    fontWeight: "bold",
    color: COLORS.primary,
    textAlign: "left",
    marginTop: -70,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.secondary,
    textAlign: "left",
    lineHeight: 24,
  },
  button: {
    backgroundColor: COLORS.shadow,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    elevation: 3,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default AboutScreen;
