import { TransactionFormData } from "@/types/transactions";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { useEffect, useState } from "react";
import { Platform } from "react-native";

const initialState: TransactionFormData = {
  stockSymbol: "",
  assetClass: "",
  type: "BUY",
  quantity: "",
  price: "",
  executedAt: new Date(),
};

export const useAddTransactionForm = (isVisible: boolean) => {
  const [formData, setFormData] = useState<TransactionFormData>(initialState);
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Reseta o formulário quando o modal se torna visível
  useEffect(() => {
    if (isVisible) {
      setFormData(initialState);
    }
  }, [isVisible]);

  const isFormValid: boolean =
    formData.stockSymbol.trim() !== "" &&
    formData.assetClass !== "" &&
    formData.quantity.trim() !== "" &&
    formData.price.trim() !== "";

  const handleInputChange = (
    name: keyof TransactionFormData,
    value: string | Date | "BUY" | "SELL"
  ) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || formData.executedAt;
    setShowDatePicker(Platform.OS === "ios");
    handleInputChange("executedAt", currentDate);
  };

  // Retornamos tudo que o componente de UI precisa para funcionar
  return {
    formData,
    showDatePicker,
    isFormValid,
    handleInputChange,
    onDateChange,
    setShowDatePicker,
  };
};
