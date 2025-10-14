export interface StocksFormData {
    amount: string | number;
    date: string;
    status: string;
    description: string;
}

export interface AddExpenseForm {
    amount: string;
    type: string;
    description: string;
    year: string;
    month: string;
}

export interface InflowForm {
    amount: string;
    source: string;
    description: string;
    year: string;
    month: string;
}