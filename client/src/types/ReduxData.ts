import type { SettingsForm } from "./FormsData"

export const Slices = {
    modal: "modal",
    settings: "settings",
    user: "user",
    data: "data",
    chart: "chart"
}

export interface ReduxModalState {
    expenseOpen: boolean;
    inflowOpen: boolean;
    stocksOpen: boolean;
    settingsOpen: boolean;
    awardOpen: boolean;
    warningOpen: boolean;
    analyticsOpen: boolean;
    successOpen: boolean;
    success?: string;
    warning?: string;
}

export interface ReduxSettingState {
    settings: SettingsForm,
}

export interface UserState {
    user: string;
    token: string;
    awards?: any[];
}

export interface DataState {
    stocks: any[];
    expenses: any[];
    inflows: any[];
}

export interface SettingsDate {
    start: string;
    end: string;
}

export interface ChartState {
    pieData: any[];
    expensePieData: any[];
    incomePieData: any[];
    hollowPieData: any[];
    inHollowPieData: any[];
    outHollowPieData: any[];
    categoryBarData: any[];
    barData: any[];
    lineData: any[];
    inScatterData: any[];
    outScatterData: any[];
    radarData: any[];
}