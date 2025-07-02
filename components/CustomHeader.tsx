import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useAuth } from "@/context/AuthContext"; // Importe seu hook de autenticação
import { COLORS } from "@/constants/colors";

export const CustomHeader = () => {
  // Usamos o hook para acessar o estado de autenticação, incluindo a carteira
  const { authState, isLoading } = useAuth();

  // Enquanto os dados do usuário/carteira estão sendo carregados, mostramos um indicador
  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color={COLORS.textPrimary} />
      </View>
    );
  }

  return (
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
          onPress={() => {
            /* Ação de Adicionar Ativo aqui */
          }}
        >
          <FontAwesome5 name="plus" size={20} color={COLORS.textSecondary} />
        </Pressable>
      </View>
    </View>
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
