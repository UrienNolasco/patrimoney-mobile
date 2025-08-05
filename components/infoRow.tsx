import { COLORS } from "@/constants/colors";
import { FontAwesome5 } from "@expo/vector-icons";
import { Text, View, StyleSheet } from "react-native";

export const InfoRow = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ComponentProps<typeof FontAwesome5>["name"];
}) => (
  <View style={styles.infoRow}>
    <FontAwesome5
      name={icon}
      size={18}
      color={COLORS.textSecondary}
      style={styles.infoIcon}
    />
    <Text style={styles.infoLabel}>{label}:</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.card,
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  infoIcon: {
    marginRight: 15,
  },
  infoLabel: {
    fontSize: 16,
    color: COLORS.textSecondary,
    fontWeight: "500",
  },
  infoValue: {
    fontSize: 16,
    color: COLORS.textPrimary,
    marginLeft: "auto",
    fontWeight: "bold",
  },
});
