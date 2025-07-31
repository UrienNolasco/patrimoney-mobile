import { api } from "@/context/AuthContext";
import { PortfolioApiResponse } from "@/types/portfolio";

const PORTFOLIO_ENDPOINT = "/portfolio";

export const fetchPortfolioData = async (): Promise<PortfolioApiResponse> => {
  try {
    const response = await api.get<PortfolioApiResponse>(PORTFOLIO_ENDPOINT);
    return response.data;
  } catch (error) {
    console.error("Erro na requisição da API de portfólio:", error);
    throw error;
  }
};

export const refreshPortfolio = async (): Promise<void> => {
  try {
    await api.post(`${PORTFOLIO_ENDPOINT}/refresh`);
  } catch (error) {
    console.error("Erro ao acionar o refresh do portfólio:", error);
    throw error;
  }
};
