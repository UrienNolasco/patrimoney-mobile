import { FormInput } from "@/components/FormInput";
import { InfoRow } from "@/components/infoRow";
import { COLORS } from "@/constants/colors";
import { api, useAuth } from "@/context/AuthContext";
import { FontAwesome5 } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

const Profile = () => {
  const { authState, logout, updateWallet } = useAuth();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (authState.wallet) {
      setName(authState.wallet.name);
      setDescription(authState.wallet.description || "");
    }
  }, [authState.wallet]);

  const handleSave = async () => {
    if (isSaving) return;
    setIsSaving(true);

    try {
      const payload = { name, description };
      await api.patch("/wallet", payload);

      updateWallet(payload);

      Toast.show({
        type: "success",
        text1: "Sucesso!",
        text2: "Sua carteira foi atualizada.",
      });
    } catch (error) {
      console.error("Erro ao atualizar a carteira:", error);
      Toast.show({
        type: "error",
        text1: "Erro",
        text2: "Não foi possível salvar as alterações.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (!authState.wallet) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color={COLORS.textPrimary} />
      </View>
    );
  }

  const hasChanges =
    name !== authState.wallet.name ||
    description !== (authState.wallet.description || "");

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={styles.title}>Perfil e Carteira</Text>

      <View style={styles.formSection}>
        <FormInput
          label="Nome da Carteira"
          value={name}
          onChangeText={setName}
          placeholder="Ex: Minha Carteira Principal"
        />
        <FormInput
          label="Descrição da Carteira"
          value={description}
          onChangeText={setDescription}
          placeholder="Ex: Investimentos de longo prazo"
          multiline
        />
        <Pressable
          style={[
            styles.saveButton,
            (!hasChanges || isSaving) && styles.saveButtonDisabled,
          ]}
          onPress={handleSave}
          disabled={!hasChanges || isSaving}
        >
          {isSaving ? (
            <ActivityIndicator color={COLORS.white} />
          ) : (
            <Text style={styles.saveButtonText}>Salvar Alterações</Text>
          )}
        </Pressable>
      </View>

      <View style={styles.divider} />

      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Detalhes da Carteira</Text>
        <InfoRow
          label="Moeda"
          value={authState.wallet.currency}
          icon="dollar-sign"
        />
        <InfoRow
          label="Status"
          value={authState.wallet.isActive ? "Ativa" : "Inativa"}
          icon="check-circle"
        />
      </View>

      <Pressable style={styles.logoutButton} onPress={logout}>
        <FontAwesome5 name="sign-out-alt" size={18} color={COLORS.negative} />
        <Text style={styles.logoutButtonText}>Sair da Conta</Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  contentContainer: {
    padding: 20,
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.textPrimary,
    marginBottom: 24,
  },
  formSection: {
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: COLORS.card,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  saveButtonDisabled: {
    backgroundColor: COLORS.card,
  },
  saveButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 30,
  },
  infoSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: COLORS.textPrimary,
    marginBottom: 15,
  },
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
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.negative,
    marginTop: 20,
  },
  logoutButtonText: {
    color: COLORS.negative,
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default Profile;
