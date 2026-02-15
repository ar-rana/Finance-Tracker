import type { SettingsForm } from "./FormsData"

export const Slices = {
    modal: "modal",
    settings: "settings",
    user: "user"
}

export interface ReduxModalState {
    expenseOpen: boolean;
    inflowOpen: boolean;
    stocksOpen: boolean;
    settingsOpen: boolean;
    awardOpen: boolean;
    warningOpen: boolean;
    analyticsOpen: boolean;
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

export interface SettingsDate {
    start: string;
    end: string;
}