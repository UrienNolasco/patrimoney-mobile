import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../constants/colors"; // Usando suas cores!

// --- Tipos para as Props ---
type InfoCardProps = {
  children: React.ReactNode;
};

type HeaderProps = {
  icon: React.ReactNode;
  title: string;
};

type ContentProps = {
  mainValue: string;
  sideComponent?: React.ReactNode; // Para o item à direita (ex: a pílula de -2%)
};

type FooterProps = {
  label: string;
  value: string;
};

// --- Componente Principal (Wrapper) ---
const InfoCard = ({ children }: InfoCardProps) => {
  return <View style={styles.cardContainer}>{children}</View>;
};

// --- Sub-componente Header ---
const Header = ({ icon, title }: HeaderProps) => (
  <View style={styles.headerContainer}>
    {icon}
    <Text style={styles.headerTitle}>{title}</Text>
  </View>
);

// --- Sub-componente Content ---
const Content = ({ mainValue, sideComponent }: ContentProps) => (
  <View style={styles.contentContainer}>
    <Text style={styles.mainValueText}>{mainValue}</Text>
    {sideComponent}
  </View>
);

// --- Sub-componente Footer ---
const Footer = ({ label, value }: FooterProps) => (
  <View style={styles.footerContainer}>
    <Text style={styles.footerLabel}>{label}</Text>
    <Text style={styles.footerValue}>{value}</Text>
  </View>
);

// Atribuindo os sub-componentes ao componente principal.
// É isso que nos permite usar a sintaxe `InfoCard.Header`, etc.
InfoCard.Header = Header;
InfoCard.Content = Content;
InfoCard.Footer = Footer;

// --- Estilos ---
const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: COLORS.card, // Uma cor escura, como na imagem. Use COLORS.surface se tiver.
    borderRadius: 16,
    padding: 24,
    marginVertical: 12,
    marginHorizontal: 16,
    // Sombra sutil para um efeito de profundidade
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  // Header
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20, // Espaço entre header e content
  },
  headerTitle: {
    fontSize: 16,
    color: COLORS.textSecondary || "#A0A0A0", // Cor secundária para o título
    marginLeft: 12,
  },
  // Content
  contentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end", // Alinha o valor principal e a pílula pela base
    marginBottom: 20, // Espaço entre content e footer
  },
  mainValueText: {
    fontSize: 36,
    fontWeight: "bold",
    color: COLORS.textPrimary || "#FFFFFF", // Cor primária para o valor
  },
  // Footer
  footerContainer: {
    // Layout padrão vertical já funciona aqui
  },
  footerLabel: {
    fontSize: 16,
    color: COLORS.textSecondary || "#A0A0A0",
  },
  footerValue: {
    fontSize: 18,
    color: COLORS.textPrimary || "#FFFFFF",
    marginTop: 4,
  },
});

export default InfoCard;
