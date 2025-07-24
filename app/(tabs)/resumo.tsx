import { PercentagePill } from "@/components/BadgePercentage";
import InfoCard from "@/components/InfoCard";
import { PortfolioTable } from "@/components/PortfolioTable";
import SafeScreen from "@/components/SafeScreen";
import { COLORS } from "@/constants/colors";
import { usePortfolio } from "@/hooks/UsePortfolio";
import { CardData } from "@/types/resumo";
import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Resumo() {
  const { cards, isLoading, error } = usePortfolio();

  const renderCard = ({ item }: { item: CardData }) => (
    <InfoCard>
      <InfoCard.Header
        icon={
          <FontAwesome5
            name={item.type === "patrimonio" ? "piggy-bank" : "chart-line"}
            size={20}
            color={COLORS.textSecondary || "#A0A0A0"}
          />
        }
        title={item.title}
      />
      <InfoCard.Content mainValue={item.mainValue} />

      {item.type === "patrimonio" && (
        <InfoCard.Footer>
          <Text style={styles.footerLabel}>Valor investido</Text>
          <Text style={styles.footerValue}>{item.footerValue}</Text>
        </InfoCard.Footer>
      )}

      {item.type === "lucro" && (
        <InfoCard.Footer style={{ alignItems: "flex-start" }}>
          <PercentagePill
            value={`${item.percentage > 0 ? "+" : ""}${item.percentage.toFixed(
              2
            )}%`}
            isNegative={item.percentage < 0}
          />
        </InfoCard.Footer>
      )}
    </InfoCard>
  );

  if (isLoading) {
    return (
      <SafeScreen>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={COLORS.textPrimary} />
        </View>
      </SafeScreen>
    );
  }

  if (error) {
    return (
      <SafeScreen>
        <View style={styles.centered}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </SafeScreen>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Minha Carteira</Text>
      </View>

      <FlatList
        style={styles.listStyle}
        data={cards}
        renderItem={renderCard}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContainer}
      />

      <View style={styles.contentBelow}>
        <Text style={styles.sectionTitle}>Meus Ativos</Text>
        <PortfolioTable />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background || "#121212",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: COLORS.textSecondary || "red",
    fontSize: 16,
  },
  header: {
    paddingTop: 10,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: COLORS.textPrimary || "#FFFFFF",
  },
  listStyle: {
    height: 250,
    flexGrow: 0,
  },
  flatListContainer: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  contentBelow: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: COLORS.textPrimary || "#FFFFFF",
    marginBottom: 16,
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
