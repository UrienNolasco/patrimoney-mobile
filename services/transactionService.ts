import { api } from "@/context/AuthContext";

export interface CreateTransactionPayload {
  walletId: string | undefined;
  type: "BUY" | "SELL";
  quantity: number;
  price: number;
  executedAt: string;
}

/**
 * Função para criar uma nova transação (comprar/vender ativo).
 * @param transactionData - Os dados da transação a serem enviados.
 */
export const createTransaction = async (
  transactionData: CreateTransactionPayload
): Promise<void> => {
  try {
    await api.post("/transactions", transactionData);
  } catch (error) {
    console.error("Erro ao criar a transação:", error);
    throw error;
  }
};
