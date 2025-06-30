import { COLORS } from "@/constants/colors";
import { FontAwesome5 } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

type PercentagePillProps = {
  value: string;
  isNegative?: boolean;
};

export const PercentagePill: React.FC<PercentagePillProps> = ({
  value,
  isNegative,
}) => (
  <View style={[styles.pillContainer, isNegative && styles.pillNegative]}>
    <Text style={styles.pillText}>{value}</Text>
    <FontAwesome5
      name={isNegative ? "arrow-down" : "arrow-up"}
      size={12}
      color="#FFF"
    />
  </View>
);

const styles = StyleSheet.create({
  // Estilos para a pílula de porcentagem
  pillContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(34, 197, 94, 0.8)", // Verde
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  pillNegative: {
    backgroundColor: "rgba(239, 68, 68, 0.8)", // Vermelho
  },
  pillText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    marginRight: 4,
  },
});
