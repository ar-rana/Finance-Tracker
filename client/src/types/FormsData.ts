export interface StocksFormData {
  price: number;
  company: string;
  date: string;
  status: string;
  description: string;
  quantity: number;
}

export interface AddExpenseForm {
  amount: number;
  category: string;
  description: string;
  year: string;
  month: string;
  day?: number | string;
}

export interface InflowForm {
  amount: number;
  source: string;
  description: string;
  year: string;
  month: string;
  day?: number | string;
}

export interface SettingsForm {
  end: string;
  start: string;
  budget: number;
  graphs: string[];
  specifiedBudgets?: Record<string, number>;
}

export interface AnalyticsFormState {
  amount: number;
  time: number;
  period: number;
  interest: string;
  rate: number;
}

export interface AwardForm {
  month: string;
  year: string;
  award: string;
  user: string;
}

export const ExpenseCategories = [
  "Investment",
  "Policies",
  "Home",
  "Travel",
  "Personal Expenses",
  "Special Expenses",
  "Outlay",
  "Gold Investment",
  "Permanent Savings",
  "Savings",
  "Spiritual",
  "Trip",
  "Credit Card",
  "Donation",
  "Miscellaneous",
  "Other",
] as const;

export type ExpenseCategory = (typeof ExpenseCategories)[number];

export const InflowSources = [
  "Salary",
  "Gift",
  "Last Month Carry",
  "Special Expenses",
  "Investment",
  "Miscellaneous",
  "Other",
] as const;

export type InflowSource = (typeof InflowSources)[number];

export const SpecificBudget = [
  "Travel",
  "Investment",
  "Personal Expenses",
  "Special Expenses",
  "Outlay",
  "Gold Investment",
  "Credit",
  "Spiritual",
];
