import type { SettingsForm } from "./FormsData"

export const Slices = {
    modal: "modal",
    settings: "settings",
    user: "user",
    data: "data"
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