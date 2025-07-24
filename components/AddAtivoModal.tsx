import { COLORS } from "@/constants/colors"; // Supondo que você tenha suas cores aqui
import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface AddAtivoModalProps {
  visible: boolean; // Controla a visibilidade do modal
  onClose: () => void; // Função para fechar o modal
}

// O componente do Modal recebe 'visible' e 'onClose' como props
export const AddAtivoModal = ({ visible, onClose }: AddAtivoModalProps) => {
  return (
    <Modal
      animationType="slide" // Animação ao aparecer
      transparent={true} // Fundo transparente para ver o conteúdo atrás
      visible={visible} // Controla a visibilidade do modal
      onRequestClose={onClose} // Função para fechar no botão "voltar" do Android
    >
      {/* Usamos TouchableOpacity para o overlay, para que o usuário possa fechar o modal clicando fora dele */}
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPressOut={onClose} // Fecha o modal ao clicar no fundo
      >
        <View style={styles.modalContent}>
          {/* Cabeçalho do Modal */}
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

          {/* Corpo do Modal */}
          <View style={styles.modalBody}>
            <Text style={styles.bodyText}>
              Aqui você pode adicionar seus campos de formulário (Inputs de
              texto, etc.) para adicionar um novo ativo à sua carteira.
            </Text>
          </View>

          {/* Rodapé do Modal com o botão de salvar */}
          <View style={styles.modalFooter}>
            <Pressable
              style={styles.saveButton}
              onPress={() => {
                /* Lógica para salvar aqui */ onClose();
              }}
            >
              <Text style={styles.saveButtonText}>Salvar Ativo</Text>
            </Pressable>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  // O overlay escurece a tela inteira atrás do modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center", // Centraliza o conteúdo do modal verticalmente
    alignItems: "center", // e horizontalmente
  },
  // O container do conteúdo do modal
  modalContent: {
    width: "90%",
    backgroundColor: COLORS.background, // Cor de fundo do seu app
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.textPrimary,
  },
  modalBody: {
    marginBottom: 20,
  },
  bodyText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    lineHeight: 24,
  },
  modalFooter: {
    alignItems: "center",
  },
  saveButton: {
    backgroundColor: COLORS.card, // Uma cor primária para o botão
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
