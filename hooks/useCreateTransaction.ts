import {
  createTransaction,
  CreateTransactionPayload,
} from "@/services/transactionService";
import { useCallback, useState } from "react";

export const useCreateTransaction = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveTransaction = useCallback(
    async (data: CreateTransactionPayload) => {
      setIsLoading(true);
      setError(null);
      try {
        await createTransaction(data);
      } catch (e) {
        setError("Não foi possível salvar a transação. Tente novamente.");
        throw e;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return { saveTransaction, isLoading, error };
};
