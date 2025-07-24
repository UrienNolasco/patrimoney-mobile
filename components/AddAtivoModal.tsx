import { COLORS } from "@/constants/colors";
import { ASSET_CLASS_OPTIONS } from "@/constants/transactions";
import { useAddTransactionForm } from "@/hooks/AddTransactionForm";
import { TransactionFormData } from "@/types/transactions";
import { FontAwesome5 } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { FormInput } from "../components/FormInput";

interface AddAtivoModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (data: TransactionFormData) => void;
}

export const AddAtivoModal: React.FC<AddAtivoModalProps> = ({
  visible,
  onClose,
  onSave,
}) => {
  // Toda a lógica complexa agora está contida nesta única linha!
  const {
    formData,
    showDatePicker,
    isFormValid,
    handleInputChange,
    onDateChange,
    setShowDatePicker,
  } = useAddTransactionForm(visible);

  const handleSave = () => {
    if (!isFormValid) return;
    onSave(formData);
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <Pressable
          style={styles.modalContent}
          onPress={(e) => e.stopPropagation()}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Adicionar Ativo</Text>
            <Pressable onPress={onClose}>
              <FontAwesome5
                name="times"
                size={24}
                color={COLORS.textSecondary}
              />
            </Pressable>
          </View>

          <View style={styles.body}>
            <FormInput
              label="Ativo (Ex: PETR4)"
              value={formData.stockSymbol}
              onChangeText={(text) =>
                handleInputChange("stockSymbol", text.toUpperCase())
              }
              placeholder="PETR4"
              autoCapitalize="characters"
            />

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Tipo do Ativo</Text>
              <RNPickerSelect
                onValueChange={(value: string) =>
                  handleInputChange("assetClass", value)
                }
                items={ASSET_CLASS_OPTIONS}
                value={formData.assetClass}
                placeholder={{ label: "Selecione um tipo...", value: null }}
                style={pickerSelectStyles}
                useNativeAndroidPickerStyle={false}
                Icon={() => (
                  <FontAwesome5
                    name="chevron-down"
                    size={14}
                    color={COLORS.textSecondary}
                  />
                )}
                pickerProps={{
                  itemStyle: {
                    color: COLORS.textPrimary,
                    backgroundColor: COLORS.card,
                  },
                }}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Tipo de Operação</Text>
              <View style={styles.typeSelector}>
                <Pressable
                  style={[
                    styles.typeButton,
                    formData.type === "BUY" && styles.typeButtonActive,
                  ]}
                  onPress={() => handleInputChange("type", "BUY")}
                >
                  <Text
                    style={[
                      styles.typeButtonText,
                      formData.type === "BUY" && styles.typeButtonTextActive,
                    ]}
                  >
                    Compra
                  </Text>
                </Pressable>
                <Pressable
                  style={[
                    styles.typeButton,
                    formData.type === "SELL" && styles.typeButtonActive,
                  ]}
                  onPress={() => handleInputChange("type", "SELL")}
                >
                  <Text
                    style={[
                      styles.typeButtonText,
                      formData.type === "SELL" && styles.typeButtonTextActive,
                    ]}
                  >
                    Venda
                  </Text>
                </Pressable>
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Data da Compra</Text>
              <Pressable onPress={() => setShowDatePicker(true)}>
                <View style={styles.dateDisplay}>
                  <Text style={styles.dateDisplayText}>
                    {formData.executedAt.toLocaleDateString("pt-BR")}
                  </Text>
                  <FontAwesome5
                    name="calendar-alt"
                    size={20}
                    color={COLORS.textSecondary}
                  />
                </View>
              </Pressable>
            </View>

            {showDatePicker && (
              <DateTimePicker
                value={formData.executedAt}
                mode="date"
                display="default"
                onChange={onDateChange}
              />
            )}

            <FormInput
              label="Quantidade"
              value={formData.quantity}
              onChangeText={(text) =>
                handleInputChange("quantity", text.replace(/[^0-9]/g, ""))
              }
              placeholder="100"
              keyboardType="numeric"
            />
            <FormInput
              label="Preço por Ativo (R$)"
              value={formData.price}
              onChangeText={(text) =>
                handleInputChange("price", text.replace(/[^0-9,.]/g, ""))
              }
              placeholder="35,50"
              keyboardType="decimal-pad"
            />
          </View>

          <View style={styles.footer}>
            <Pressable
              style={[
                styles.saveButton,
                !isFormValid && styles.saveButtonDisabled,
              ]}
              onPress={handleSave}
              disabled={!isFormValid}
            >
              <Text style={styles.saveButtonText}>Adicionar Ativo</Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    backgroundColor: COLORS.background,
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  title: { fontSize: 22, fontWeight: "bold", color: COLORS.textPrimary },
  body: { marginBottom: 20 },
  footer: { alignItems: "center" },
  inputContainer: { marginBottom: 15 },
  label: { fontSize: 16, color: COLORS.textSecondary, marginBottom: 8 },
  typeSelector: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    overflow: "hidden",
  },
  typeButton: { flex: 1, paddingVertical: 12, alignItems: "center" },
  typeButtonActive: { backgroundColor: COLORS.card },
  typeButtonText: {
    fontSize: 16,
    color: COLORS.textPrimary,
    fontWeight: "bold",
  },
  typeButtonTextActive: { color: "#FFFFFF" },
  dateDisplay: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.background,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  dateDisplayText: { fontSize: 16, color: COLORS.textPrimary },
  saveButton: {
    backgroundColor: COLORS.card,
    paddingVertical: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  saveButtonDisabled: { backgroundColor: COLORS.background, opacity: 0.6 },
  saveButtonText: { color: "#FFFFFF", fontSize: 18, fontWeight: "bold" },
});

// Estilos específicos para o RNPickerSelect
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    color: COLORS.textPrimary,
    backgroundColor: COLORS.background,
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    color: COLORS.textPrimary,
    backgroundColor: COLORS.background,
    paddingRight: 30,
  },
  iconContainer: { top: 18, right: 15 },
  placeholder: { color: COLORS.textSecondary },
  modalViewMiddle: { backgroundColor: COLORS.card },
  done: { color: COLORS.textPrimary },
});
