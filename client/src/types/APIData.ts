export interface MonthlyChart {
    month: string;
    expenditure: string | number;
    income: string | number;
    amount: string | number;
}

export interface Response {
    message: string;
    data: any;
    success: boolean;
} 