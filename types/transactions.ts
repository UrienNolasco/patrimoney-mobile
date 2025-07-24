export interface TransactionFormData {
  stockSymbol: string;
  assetClass: string;
  type: "BUY" | "SELL";
  quantity: string;
  price: string;
  executedAt: Date;
}
