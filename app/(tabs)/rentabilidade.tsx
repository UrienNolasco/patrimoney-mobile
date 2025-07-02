import InfoCard from "@/components/InfoCard";
import React from "react";
import { Dimensions, ScrollView, StyleSheet, Text } from "react-native";
import {
  BarChart,
  ContributionGraph,
  LineChart,
  PieChart,
  ProgressChart,
} from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

const chartConfig = {
  backgroundGradientFrom: "#1E1E1E",
  backgroundGradientTo: "#1E1E1E",
  decimalPlaces: 2,
  color: (opacity = 1) => `rgba(0, 200, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  propsForDots: {
    r: "4",
    strokeWidth: "2",
    stroke: "#00c8ff",
  },
};

const Rentabilidade = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Gráfico de Linha</Text>
      <LineChart
        data={{
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          datasets: [{ data: [20, 45, 28, 80, 99, 43] }],
        }}
        width={screenWidth - 32}
        height={220}
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
      />

      <Text style={styles.title}>Gráfico de Barras</Text>
      <BarChart
        data={{
          labels: ["Red", "Blue", "Yellow", "Green"],
          datasets: [{ data: [30, 70, 40, 60] }],
        }}
        width={screenWidth - 32}
        height={220}
        yAxisLabel="$" // ✅ Obrigatório
        yAxisSuffix="" // ✅ Mesmo que vazio, precisa estar presente
        chartConfig={chartConfig}
        style={styles.chart}
      />
      <InfoCard>
        <InfoCard.Header
          title="Gráfico de Pizza"
          icon={<Text style={{ color: "#fff" }}>📈</Text>}
        />
        <InfoCard.CustomContent>
          <PieChart
            data={[
              {
                name: "Ações",
                population: 25,
                color: "#ff6384",
                legendFontColor: "#fff",
                legendFontSize: 14,
              },
              {
                name: "Renda Fixa",
                population: 25,
                color: "#36a2eb",
                legendFontColor: "#fff",
                legendFontSize: 14,
              },
              {
                name: "Cripto",
                population: 50,
                color: "#ffce56",
                legendFontColor: "#fff",
                legendFontSize: 14,
              },
            ]}
            width={screenWidth - 32}
            height={220}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            chartConfig={chartConfig}
            style={styles.chart}
          />
        </InfoCard.CustomContent>
        <InfoCard.Footer>
          <Text style={{ color: "#fff" }}>Último mês</Text>
        </InfoCard.Footer>
      </InfoCard>
      <Text style={styles.title}></Text>

      <Text style={styles.title}>Gráfico de Progresso</Text>
      <ProgressChart
        data={{
          labels: ["Ações", "Renda Fixa", "Cripto"],
          data: [0.6, 0.8, 0.3],
        }}
        width={screenWidth - 32}
        height={220}
        strokeWidth={16}
        radius={32}
        chartConfig={chartConfig}
        style={styles.chart}
      />

      <Text style={styles.title}>Contribution Graph</Text>
      <ContributionGraph
        values={[
          { date: "2025-06-01", count: 1 },
          { date: "2025-06-02", count: 2 },
          { date: "2025-06-03", count: 3 },
          { date: "2025-06-04", count: 4 },
          { date: "2025-06-05", count: 5 },
          { date: "2025-06-06", count: 2 },
        ]}
        endDate={new Date("2025-06-30")}
        numDays={30}
        width={screenWidth - 32}
        height={220}
        tooltipDataAttrs={() => ({})} // ✅ Aqui
        chartConfig={chartConfig}
        style={styles.chart}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#121212",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 16,
    marginBottom: 8,
  },
  chart: {
    borderRadius: 12,
    marginBottom: 24,
  },
});

export default Rentabilidade;
