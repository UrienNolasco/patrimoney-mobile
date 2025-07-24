import { COLORS } from "@/constants/colors";
import { FontAwesome5 } from "@expo/vector-icons";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import React, { useEffect, useState } from "react";
import {
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";

export interface FormData {
  stockSymbol: string;
  assetClass: string;
  type: "BUY" | "SELL";
  quantity: string; // Mantemos como string para o input, convertemos ao salvar
  price: string; // Mantemos como string para o input, convertemos ao salvar
  executedAt: Date;
}

// Interface para as props do nosso componente de input customizado
interface FormInputProps extends TextInputProps {
  label: string;
}

// Interface para as props do nosso componente principal do Modal
interface AddAtivoModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (data: FormData) => void;
}

const assetClassOptions = [
  { label: "Ação", value: "ACAO" },
  { label: "Fundo Imobiliário (FII)", value: "FII" },
  { label: "BDR", value: "BDR" },
  { label: "Renda Fixa", value: "RENDA_FIXA" },
  { label: "Fundo de Investimento", value: "FUNDO" },
  { label: "ETF", value: "ETF" },
  { label: "Criptomoeda", value: "CRIPTO" },
  { label: "Commodity", value: "COMMODITY" },
  { label: "Opção", value: "OPCAO" },
  { label: "Futuro", value: "FUTURO" },
  { label: "Outros", value: "OUTROS" },
];

// Componente de Input reutilizável e tipado
const FormInput: React.FC<FormInputProps> = ({ label, ...props }) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={styles.input}
      placeholderTextColor={COLORS.textSecondary}
      {...props}
    />
  </View>
);

// Componente principal do Modal, agora usando React.FC com a nossa interface de Props
export const AddAtivoModal: React.FC<AddAtivoModalProps> = ({
  visible,
  onClose,
  onSave,
}) => {
  // O useState agora é tipado com a interface FormData
  const [formData, setFormData] = useState<FormData>({
    stockSymbol: "",
    type: "BUY",
    assetClass: "",
    quantity: "",
    price: "",
    executedAt: new Date(),
  });

  const initialState: FormData = {
    stockSymbol: "",
    assetClass: "",
    type: "BUY",
    quantity: "",
    price: "",
    executedAt: new Date(),
  };

  useEffect(() => {
    // 3. Se o modal estiver se tornando visível, resetamos o formulário.
    if (visible) {
      setFormData(initialState);
    }
  }, [visible]);

  const isFormValid: boolean =
    formData.stockSymbol.trim() !== "" &&
    formData.quantity.trim() !== "" &&
    formData.assetClass !== "";

  const [showDatePicker, setShowDatePicker] = useState(false);

  // Função para atualizar o estado do formulário, com tipagem para as chaves e valores
  const handleInputChange = (
    name: keyof FormData,
    value: string | Date | "BUY" | "SELL"
  ) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // A data do evento do DatePicker agora é tipada
  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || formData.executedAt;
    setShowDatePicker(Platform.OS === "ios");
    handleInputChange("executedAt", currentDate);
  };

  const handleSave = () => {
    if (!isFormValid) return;

    console.log("Enviando para o backend:", formData);
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
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Adicionar Ativo</Text>
            <Pressable onPress={onClose}>
              <FontAwesome5
                name="times"
                size={24}
                color={COLORS.textSecondary}
              />
            </Pressable>
          </View>

          <View style={styles.modalBody}>
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
                items={assetClassOptions}
                value={formData.assetClass}
                placeholder={{ label: "Selecione um tipo...", value: null }}
                style={pickerSelectStyles} // Estilos customizados
                useNativeAndroidPickerStyle={false} // Para usar o estilo customizado no Android
                Icon={() => {
                  return (
                    <FontAwesome5
                      name="chevron-down"
                      size={14}
                      color={COLORS.textSecondary}
                    />
                  );
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
                    color={COLORS.textPrimary}
                  />
                </View>
              </Pressable>
            </View>

            {showDatePicker && (
              <DateTimePicker
                testID="dateTimePicker"
                value={formData.executedAt}
                mode="date"
                is24Hour={true}
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

          <View style={styles.modalFooter}>
            <Pressable style={styles.saveButton} onPress={handleSave}>
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
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: COLORS.textPrimary,
  },
  modalBody: {
    marginBottom: 20,
  },
  modalFooter: {
    alignItems: "center",
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  input: {
    backgroundColor: COLORS.background,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: COLORS.textPrimary,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  typeSelector: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    overflow: "hidden",
  },
  typeButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
  },
  typeButtonActive: {
    backgroundColor: COLORS.card,
  },
  typeButtonText: {
    fontSize: 16,
    color: COLORS.textPrimary,
    fontWeight: "bold",
  },
  typeButtonTextActive: {
    color: "#FFFFFF",
  },
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
  dateDisplayText: {
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  saveButton: {
    backgroundColor: COLORS.card,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    color: COLORS.textPrimary,
    backgroundColor: COLORS.card,
    paddingRight: 30, // para garantir que o texto não fique atrás do ícone
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    color: COLORS.textPrimary,
    backgroundColor: COLORS.card,
    paddingRight: 30, // para garantir que o texto não fique atrás do ícone
  },
  iconContainer: {
    top: 18,
    right: 15,
  },
  placeholder: {
    color: COLORS.textSecondary,
  },
});
