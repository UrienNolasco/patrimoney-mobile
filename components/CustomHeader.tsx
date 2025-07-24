import { COLORS } from "@/constants/colors";
import { useAuth } from "@/context/AuthContext"; // Importe seu hook de autenticação
import { FontAwesome5 } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { AddAtivoModal } from "./AddAtivoModal";
import { TransactionFormData } from "@/types/transactions";


export const CustomHeader = () => {
  const { authState, isLoading } = useAuth();
  const [isModalVisible, setModalVisible] = useState(false);

  const handleSaveTransaction = (data: TransactionFormData) => {
    // 1. Adicione o walletId que você já tem no seu authState
    const transactionData = {
      ...data,
      walletId: authState.wallet?.id, // Supondo que o ID da carteira está aqui
      // 2. Converta os dados para o formato que o backend espera
      quantity: parseInt(data.quantity, 10), // Converte string para número inteiro
      price: parseFloat(data.price.replace(",", ".")), // Converte string para número com casas decimais
      executedAt: data.executedAt.toISOString(), // Converte a data para o formato ISO 8601
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
            onPress={() => {
              /* Ação de Refresh aqui */
            }}
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
