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
