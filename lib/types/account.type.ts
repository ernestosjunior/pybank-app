export interface Account {
  balance: number;
  daily_withdrawal_limit: number;
  id: number;
  person_id: number;
  status: boolean;
  transactions: Transaction[];
  type: number;
}

export interface Transaction {
  account_id: number;
  created_at: string;
  id: number;
  value: number;
}
