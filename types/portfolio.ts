export type PortfolioApiResponse = {
  patrimonio_investido: string;
  patrimonio_real: string;
  ganho_perda_total: string;
  ganho_perda_percentual: string;
  items: PortfolioItem[];
};

export interface PortfolioItem {
  stockSymbol: string;
  quantity: string;
  avgCost: string;
  stockName: string;
  assetClass: string;
  logoUrl: string;
  currentPrice: string;
  marketValue: string;
  totalCost: string;
  gainLoss: string;
  gainLossPercent: string;
}
