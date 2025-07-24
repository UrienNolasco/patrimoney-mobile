import { useState, useEffect } from "react";
import { fetchPortfolioData } from "@/services/porfolioService";
import { PortfolioItem } from "@/types/portfolio";


export const usePortfolioTable = () => {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchPortfolioData();
        setItems(data.items);
      } catch (e) {
        console.error("Erro ao carregar dados da tabela de portfólio:", e);
        setError("Não foi possível carregar os ativos.");
        setItems([]); 
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []); 

  return { items, isLoading, error };
};
