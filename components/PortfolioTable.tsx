import React from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Row, Table } from "react-native-table-component";

import { COLORS } from "@/constants/colors";
import { usePortfolio } from "@/context/PortfolioContext";
import { PortfolioItem } from "@/types/portfolio";
import { FontAwesome5 } from "@expo/vector-icons";
import { Image } from "expo-image";

const formatCurrency = (value: string): string => {
  const number = parseFloat(value);
  if (isNaN(number)) return "R$ -";
  return number.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
};

const formatPercentage = (value: string): string => {
  const number = parseFloat(value);
  if (isNaN(number)) return "- %";
  return `${number.toFixed(2).replace(".", ",")}%`;
};

export const PortfolioTable = () => {
  const { items, isLoading, error } = usePortfolio();

  const tableHead = [
    "Ativo",
    "Qtd.",
    "Preço Médio",
    "Preço Atual",
    "Variação",
    "Saldo",
    "Saldo Atual",
  ];
  const columnWidths = [100, 70, 120, 120, 100, 120, 120];
  const renderItem = (item: PortfolioItem, index: number) => {
    const gainLoss = parseFloat(item.gainLossPercent);
    let variationStyle = styles.neutralText;
    if (gainLoss > 0) variationStyle = styles.positiveText;
    if (gainLoss < 0) variationStyle = styles.negativeText;

    const rowData = [
      <View key={1} style={styles.assetCell}>
        <Image
          source={{ uri: item.logoUrl }}
          style={styles.logo}
          contentFit="contain"
        />
        <Text style={styles.assetCellText}>{item.stockSymbol}</Text>
      </View>,
      <Text key={2} style={styles.rowText}>
        {parseInt(item.quantity, 10)}
      </Text>,
      <Text key={3} style={styles.rowText}>
        {formatCurrency(item.avgCost)}
      </Text>,
      <Text key={4} style={styles.rowText}>
        {formatCurrency(item.currentPrice)}
      </Text>,
      <Text key={5} style={variationStyle}>
        {formatPercentage(item.gainLossPercent)}
      </Text>,
      <Text key={6} style={styles.rowText}>
        {formatCurrency(item.totalCost)}
      </Text>,
      <Text key={7} style={styles.rowText}>
        {formatCurrency(item.marketValue)}
      </Text>,
    ];

    return (
      <Row
        key={index}
        data={rowData}
        style={[styles.row, index % 2 === 1 && styles.rowStriped]}
        widthArr={columnWidths}
      />
    );
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.textPrimary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (items.length === 0) {
    return (
      <View style={styles.centered}>
        <FontAwesome5 name="box-open" size={40} color={COLORS.textSecondary} />
        <Text style={styles.emptyText}>
          Aperte o ícone &quot;+&quot; no header para adicionar um novo ativo.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View>
          <Table borderStyle={{ borderWidth: 1, borderColor: COLORS.border }}>
            <Row
              data={tableHead}
              style={styles.header}
              textStyle={styles.headerText}
              widthArr={columnWidths}
            />
            {items.map(renderItem)}
          </Table>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.textPrimary,
    marginBottom: 16,
  },
  centered: {
    marginTop: 40,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  assetCell: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingLeft: 10,
  },
  assetCellText: {
    color: COLORS.textPrimary,
    fontWeight: "500",
  },
  logo: {
    width: 28,
    height: 40,
    marginRight: 8,
  },
  errorText: {
    fontSize: 16,
    color: "#F44336",
    textAlign: "center",
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: "center",
    marginTop: 16,
  },
  header: {
    height: 50,
    backgroundColor: COLORS.card,
  },
  headerText: {
    textAlign: "center",
    fontWeight: "bold",
    color: COLORS.textPrimary,
  },
  row: {
    height: 45,
    backgroundColor: COLORS.background,
  },
  rowStriped: {
    backgroundColor: COLORS.card,
  },
  rowText: {
    textAlign: "center",
    color: COLORS.textSecondary,
  },
  positiveText: {
    color: COLORS.positive,
    textAlign: "center",
    fontWeight: "bold",
  },
  negativeText: {
    color: COLORS.negative,
    textAlign: "center",
    fontWeight: "bold",
  },
  neutralText: {
    color: COLORS.textSecondary,
    textAlign: "center",
    fontWeight: "bold",
  },
});
