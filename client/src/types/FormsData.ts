export interface StocksFormData {
    amount: string;
    company: string;
    date: string;
    status: string;
    description: string;
    quantity: number;
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