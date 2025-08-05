import { listGoals } from "@/services/goalService";
import {
  ContributeToGoalPayload,
  CreateGoalPayload,
  Goal,
  UpdateGoalPayload,
} from "@/types/goals";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "./AuthContext";

interface GoalsContextType {
  goals: Goal[];
  isLoading: boolean;
  error: string | null;
  refetchGoals: () => Promise<void>;
  createGoal: (payload: Omit<CreateGoalPayload, "walletId">) => Promise<void>;
  contributeToGoal: (
    goalId: string,
    payload: ContributeToGoalPayload
  ) => Promise<void>;
  updateGoal: (goalId: string, payload: UpdateGoalPayload) => Promise<void>;
  deleteGoal: (goalId: string) => Promise<void>;
}

const GoalsContext = createContext<GoalsContextType | undefined>(undefined);

export const GoalsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { authState } = useAuth();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetchGoals = useCallback(async () => {
    if (!authState.isAuthenticated || !authState.wallet?.id) {
      setIsLoading(false);
      setGoals([]); 
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const data = await listGoals(authState.wallet.id);
      setGoals(data);
    } catch (e) {
      console.error("Erro ao carregar metas:", e);
      setError("Não foi possível carregar as metas.");
      setGoals([]);
    } finally {
      setIsLoading(false);
    }
  }, [authState.isAuthenticated, authState.wallet?.id]); 

  useEffect(() => {
    refetchGoals();
  }, [refetchGoals]);

  const handleAction = async (action: () => Promise<any>) => {
    try {
      await action();
      await refetchGoals();
    } catch (e: any) {
      console.error("Erro na operação da meta:", e);
      const errorMessage =
        e.response?.data?.message ||
        e.message ||
        "Ocorreu um erro na operação.";
      setError(errorMessage);
      throw e;
    }
  };

  const createGoal = useCallback(
    async (payload: Omit<CreateGoalPayload, "walletId">) => {
      if (!authState.wallet?.id) throw new Error("Carteira não encontrada.");
      const fullPayload = { ...payload, walletId: authState.wallet.id };
      await handleAction(() => createGoal(fullPayload));
    },
    [authState.wallet?.id, refetchGoals]
  );

  const contributeToGoal = useCallback(
    async (goalId: string, payload: ContributeToGoalPayload) => {
      await handleAction(() => contributeToGoal(goalId, payload));
    },
    [refetchGoals]
  );

  const updateGoal = useCallback(
    async (goalId: string, payload: UpdateGoalPayload) => {
      await handleAction(() => updateGoal(goalId, payload));
    },
    [refetchGoals]
  );

  const deleteGoal = useCallback(
    async (goalId: string) => {
      await handleAction(() => deleteGoal(goalId));
    },
    [refetchGoals]
  );

  return (
    <GoalsContext.Provider
      value={{
        goals,
        isLoading,
        error,
        refetchGoals,
        createGoal,
        contributeToGoal,
        updateGoal,
        deleteGoal,
      }}
    >
      {children}
    </GoalsContext.Provider>
  );
};

export const useGoals = () => {
  const context = useContext(GoalsContext);
  if (context === undefined) {
    throw new Error("useGoals must be used within a GoalsProvider");
  }
  return context;
};
