export type ExpenseType = 'pembelian alat' | 'pembelian bahan' | 'peminjaman' | 'investasi';

export interface Expense {
  id: string;
  name: string;
  qty: number;
  price: number;
  created_at: string; // TIMESTAMP
  invoice?: string; // TEXT, nullable
  method: string; // TEXT
  type: ExpenseType; // expense_type
}

export type IncomeType = 'penjualan' | 'hibah';

export interface Income {
  id: string;
  name: string;
  qty: number;
  price: number;
  created_at: string; // TIMESTAMP
  type: IncomeType; // income_type
}

export type Finance = Expense | Income;