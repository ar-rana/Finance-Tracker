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
    amount: string | number;
    source: string;
    description: string;
    year: string;
    month: string;
}

export interface SettingsForm {
    end: string;
    start: string;
    budget: string;
    graphs: string[];
}