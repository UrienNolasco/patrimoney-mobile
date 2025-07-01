import { useAuth } from "@/context/AuthContext";
import { fetchPortfolioData } from "@/services/porfolioService";
import { CardData } from "@/types/resumo";
import { useEffect, useState } from "react";

const formatCurrency = (value: string | number) => {
  const numberValue = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(numberValue)) return "R$ --";

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(numberValue);
};

export const usePortfolio = () => {
  const { authState } = useAuth();
  const [cards, setCards] = useState<CardData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      if (!authState.token) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const apiData = await fetchPortfolioData();

        const transformedData: CardData[] = [
          {
            id: "1",
            type: "patrimonio",
            title: "Patrimônio real",
            mainValue: formatCurrency(apiData.patrimonio_real),
            footerLabel: "Valor investido",
            footerValue: formatCurrency(apiData.patrimonio_investido),
            percentage: parseFloat(apiData.ganho_perda_percentual),
          },
          {
            id: "2",
            type: "lucro",
            title: "Lucro/Prejuízo Total",
            mainValue: formatCurrency(apiData.ganho_perda_total),
            footerLabel: "Performance da carteira",
            footerValue: "Desde o início", // Valor estático para o exemplo
            percentage: parseFloat(apiData.ganho_perda_percentual),
          },
        ];

        setCards(transformedData);
        setError(null);
      } catch (e) {
        setError("Não foi possível carregar as informações da carteira.");
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [authState.token]);

  return { cards, isLoading, error };
};
