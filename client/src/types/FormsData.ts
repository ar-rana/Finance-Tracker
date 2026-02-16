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
}

export interface InflowForm {
    amount: number;
    source: string;
    description: string;
    year: string;
    month: string;
}

export interface SettingsForm {
    end: string;
    start: string;
    budget: number;
    graphs: string[];
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