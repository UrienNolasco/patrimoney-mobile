import { fetchPortfolioData } from "@/services/porfolioService";
import { PortfolioItem } from "@/types/portfolio";
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface PortfolioContextType {
  items: PortfolioItem[];
  isLoading: boolean;
  error: string | null;
  refetchPortfolio: () => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(
  undefined
);

export const PortfolioProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetchPortfolio = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchPortfolioData();
      setItems(data.items);
    } catch (e) {
      console.error("Erro ao carregar dados do portfólio:", e);
      setError("Não foi possível carregar os ativos.");
      setItems([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refetchPortfolio();
  }, [refetchPortfolio]);

  return (
    <PortfolioContext.Provider
      value={{ items, isLoading, error, refetchPortfolio }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
};
