import { api } from "@/context/AuthContext";

export type PortfolioApiResponse = {
  patrimonio_investido: string;
  patrimonio_real: string;
  ganho_perda_total: string;
  ganho_perda_percentual: string;
  items: any[];
};

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
