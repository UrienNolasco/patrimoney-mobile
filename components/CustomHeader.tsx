import { COLORS } from "@/constants/colors";
import { useAuth } from "@/context/AuthContext"; // Importe seu hook de autenticação
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
import Toast, { ErrorToast, SuccessToast } from "react-native-toast-message";
import { AddAtivoModal } from "./AddAtivoModal";

export const CustomHeader = () => {
  const { authState, isLoading } = useAuth();
  const [isModalVisible, setModalVisible] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);


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

  const handleSaveTransaction = (data: TransactionFormData) => {
    const transactionData = {
      ...data,
      walletId: authState.wallet?.id,
      quantity: parseInt(data.quantity, 10),
      price: parseFloat(data.price.replace(",", ".")),
      executedAt: data.executedAt.toISOString(),
    };

    console.log("Pronto para enviar:", transactionData);
    // TODO: Chamar a sua função que faz a requisição POST para o backend aqui
    // ex: api.post('/transactions', transactionData);
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
        {/* Seção Esquerda: Informações da Carteira */}
        <View style={styles.walletInfoContainer}>
          <Text style={styles.walletName} numberOfLines={1}>
            {authState.wallet?.name}
          </Text>
          <Text style={styles.walletDescription} numberOfLines={1}>
            {authState.wallet?.description}
          </Text>
        </View>

        {/* Seção Direita: Botões de Ação */}
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
            // 4. Ao pressionar, mude o estado para true para abrir o modal
            onPress={() => setModalVisible(true)}
          >
            <FontAwesome5 name="plus" size={20} color={COLORS.textSecondary} />
          </Pressable>
        </View>
      </View>

      {/* 5. Renderize o modal aqui. Ele só será visível quando isModalVisible for true */}
      <AddAtivoModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSaveTransaction} // Passe a função de salvar para o modal
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
    backgroundColor: COLORS.background, // Cor de fundo do header
    borderBottomWidth: 1,
    borderBottomColor: COLORS.card, // Uma linha sutil para separar do conteúdo
  },
  walletInfoContainer: {
    flex: 1, // Permite que o nome da carteira encolha se necessário
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
    marginLeft: 20, // Espaçamento entre os botões
    padding: 4, // Aumenta a área de toque
  },
});

export default CustomHeader;
