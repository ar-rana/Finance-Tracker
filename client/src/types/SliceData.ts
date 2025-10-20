export const Slices = {
    modal: "modal",
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