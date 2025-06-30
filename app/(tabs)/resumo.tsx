import { PercentagePill } from "@/components/BadgePercentage";
import InfoCard from "@/components/InfoCard";
import SafeScreen from "@/components/SafeScreen";
import { COLORS } from "@/constants/colors";
import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <SafeScreen>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Minha Carteira</Text>
        </View>

        {/* --- Usando o novo InfoCard para recriar o exemplo --- */}
        <InfoCard>
          <InfoCard.Header
            icon={
              <FontAwesome5
                name="piggy-bank"
                size={20}
                color={COLORS.textSecondary || "#A0A0A0"}
              />
            }
            title="Patrimônio real"
          />
          <InfoCard.Content
            mainValue="R$ 12.100,26"
            sideComponent={<PercentagePill value="-2%" isNegative />}
          />
          <InfoCard.Footer label="Valor investido" value="R$ 12.356,90" />
        </InfoCard>

        {/* Você pode adicionar outros cards facilmente */}
        <InfoCard>
          <InfoCard.Header
            icon={
              <FontAwesome5
                name="dollar-sign"
                size={20}
                color={COLORS.textSecondary || "#A0A0A0"}
              />
            }
            title="Receita mensal"
          />
          <InfoCard.Content
            mainValue="R$ 850,00"
            sideComponent={<PercentagePill value="+5%" />}
          />
          <InfoCard.Footer label="Meta mensal" value="R$ 1.200,00" />
        </InfoCard>
        <InfoCard>
          <InfoCard.Header
            icon={
              <FontAwesome5
                name="dollar-sign"
                size={20}
                color={COLORS.textSecondary || "#A0A0A0"}
              />
            }
            title="Receita mensal"
          />
          <InfoCard.Content
            mainValue="R$ 850,00"
            sideComponent={<PercentagePill value="+5%" />}
          />
          <InfoCard.Footer label="Meta mensal" value="R$ 1.200,00" />
        </InfoCard>
        <InfoCard>
          <InfoCard.Header
            icon={
              <FontAwesome5
                name="dollar-sign"
                size={20}
                color={COLORS.textSecondary || "#A0A0A0"}
              />
            }
            title="Receita mensal"
          />
          <InfoCard.Content
            mainValue="R$ 850,00"
            sideComponent={<PercentagePill value="+5%" />}
          />
          <InfoCard.Footer label="Meta mensal" value="R$ 1.200,00" />
        </InfoCard>
        <InfoCard>
          <InfoCard.Header
            icon={
              <FontAwesome5
                name="dollar-sign"
                size={20}
                color={COLORS.textSecondary || "#A0A0A0"}
              />
            }
            title="Receita mensal"
          />
          <InfoCard.Content
            mainValue="R$ 850,00"
            sideComponent={<PercentagePill value="+5%" />}
          />
          <InfoCard.Footer label="Meta mensal" value="R$ 1.200,00" />
        </InfoCard>
        <InfoCard>
          <InfoCard.Header
            icon={
              <FontAwesome5
                name="dollar-sign"
                size={20}
                color={COLORS.textSecondary || "#A0A0A0"}
              />
            }
            title="Receita mensal"
          />
          <InfoCard.Content
            mainValue="R$ 850,00"
            sideComponent={<PercentagePill value="+5%" />}
          />
          <InfoCard.Footer label="Meta mensal" value="R$ 1.200,00" />
        </InfoCard>
      </ScrollView>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background || "#121212", // Um fundo escuro para combinar
  },
  header: {
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: COLORS.textPrimary || "#FFFFFF",
  },
});
