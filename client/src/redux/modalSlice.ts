import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Slices, type ReduxModalState } from "../types/ReduxData";

const initialState: ReduxModalState = {
    awardOpen: false,
    inflowOpen: false,
    expenseOpen: false,
    settingsOpen: false,
    stocksOpen: false,
    warningOpen: false,
    analyticsOpen: false,
    warning: "",
}

export const modalSlice = createSlice({
    name: Slices.modal,
    initialState: initialState,
    reducers: {
        toggleAward: (state) => {
            state.awardOpen = !state.awardOpen;
        },
        toggleInflow: (state) => {
            state.inflowOpen = !state.inflowOpen;
        },
        toggleExpense: (state) => {
            state.expenseOpen = !state.expenseOpen;
        },
        toggleSettings: (state) => {
            state.settingsOpen = !state.settingsOpen;
        },
        toggleStocks: (state) => {
            state.stocksOpen = !state.stocksOpen;
        },
        toggleAnalytics: (state) => {
            state.analyticsOpen = !state.analyticsOpen;
        },
        closeWarn: (state) => {
            state.warningOpen = false;
        },
        warn: (state, action: PayloadAction<string>) => {
            state.warningOpen = !state.warningOpen;
            state.warning = action.payload;
        },
    } 
})

export const { toggleAward, toggleExpense, toggleInflow, toggleSettings, toggleStocks, toggleAnalytics, warn, closeWarn } = modalSlice.actions

export default modalSlice.reducer