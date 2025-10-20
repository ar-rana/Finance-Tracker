import type { SettingsForm } from "./FormsData"

export const Slices = {
    modal: "modal",
    settings: "settings",
} 

export interface ReduxModalState {
    expenseOpen: boolean,
    inflowOpen: boolean,
    stocksOpen: boolean,
    settingsOpen: boolean,
    awardOpen: boolean,
    warningOpen: boolean,
    warning?: string,
}

export interface ReduxSettingState {
    settings: SettingsForm,
}