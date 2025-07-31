import { COLORS } from "@/constants/colors";
import { useAuth } from "@/context/AuthContext"; // Importe seu hook de autenticação
import { useCreateTransaction } from "@/hooks/useCreateTransaction";
import { refreshPortfolio } from "@/services/porfolioService";
import { TransactionFormData } from "@/types/transactions";
import { FontAwesome5 } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { AddAtivoModal } from "./AddAtivoModal";

export const CustomHeader = () => {
  const { authState, isLoading } = useAuth();
  const [isModalVisible, setModalVisible] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { saveTransaction, isLoading: isSaving } = useCreateTransaction();

  const handleCloseModal = () => setModalVisible(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refreshPortfolio();
      Toast.show({
        type: "success",
        text1: "Sucesso! 👋",
        text2: "Seu portfólio está sendo atualizado.",
        position: "bottom",
        visibilityTime: 5000,
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Erro",
        text2: "Não foi possível solicitar a atualização.",
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleSaveTransaction = async (data: TransactionFormData) => {
    const transactionData = {
      ...data,
      walletId: authState.wallet?.id,
      quantity: parseInt(data.quantity, 10),
      price: parseFloat(data.price.replace(",", ".")),
      executedAt: data.executedAt.toISOString(),
    };

    try {
      await saveTransaction(transactionData);

      handleCloseModal();

      await handleRefresh();

      Toast.show({
        type: "success",
        text1: "Sucesso!",
        text2: "Seu ativo foi adicionado à carteira.",
      });
    } catch (error) {
      handleCloseModal();
      Toast.show({
        type: "error",
        text1: "Erro ao Salvar",
        text2: "Não foi possível adicionar o ativo. Tente novamente.",
      });
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color={COLORS.textPrimary} />
      </View>
    );
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.walletInfoContainer}>
          <Text style={styles.walletName} numberOfLines={1}>
            {authState.wallet?.name}
          </Text>
          <Text style={styles.walletDescription} numberOfLines={1}>
            {authState.wallet?.description}
          </Text>
        </View>

        <View style={styles.actionsContainer}>
          <Pressable
            style={styles.actionButton}
            onPress={handleRefresh}
            disabled={isRefreshing}
          >
            <FontAwesome5
              name="sync-alt"
              size={18}
              color={COLORS.textSecondary}
            />
          </Pressable>
          <Pressable
            style={styles.actionButton}
            onPress={() => setModalVisible(true)}
          >
            <FontAwesome5 name="plus" size={20} color={COLORS.textSecondary} />
          </Pressable>
        </View>
      </View>

      <AddAtivoModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSaveTransaction}
        isSaving={isSaving} 
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.background,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.card,
  },
  walletInfoContainer: {
    flex: 1, 
    marginRight: 16,
  },
  walletName: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.textPrimary,
  },
  walletDescription: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionButton: {
    marginLeft: 20,
    padding: 4,
  },
});

export default CustomHeader;
