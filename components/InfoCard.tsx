import React from "react";
import {
  Dimensions,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import { COLORS } from "../constants/colors"; // Usando suas cores!

type InfoCardProps = {
  children: React.ReactNode;
};

type HeaderProps = {
  icon: React.ReactNode;
  title: string;
};

type ContentProps = {
  mainValue: string;
  sideComponent?: React.ReactNode;
};

type FooterProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>; // Prop de estilo opcional
};

const screenWidth = Dimensions.get("window").width;

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

const CustomContent = ({ children }: { children: React.ReactNode }) => (
  <View style={{ padding: 16 }}>{children}</View>
);

// --- Sub-componente Footer ---
const Footer = ({ children, style }: FooterProps) => (
  // O container agora usa tanto o estilo base quanto o customizado que for passado
  <View style={[styles.footerContainer, style]}>{children}</View>
);

InfoCard.Header = Header;
InfoCard.Content = Content;
InfoCard.Footer = Footer;
InfoCard.CustomContent = CustomContent;

// --- Estilos ---
const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 24,
    marginVertical: 12,
    marginHorizontal: 12,
    width: screenWidth * 0.8,
  },
  // Header
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    color: COLORS.textSecondary || "#A0A0A0",
    marginLeft: 12,
  },
  // Content
  contentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 16,
  },
  mainValueText: {
    fontSize: 30,
    fontWeight: "bold",
    color: COLORS.textPrimary || "#FFFFFF",
  },
  footerContainer: {
    marginTop: 8,
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
