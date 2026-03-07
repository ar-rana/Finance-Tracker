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
    successOpen: false,
    success: "",
    warning: "",
    time: 2000,
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
        closeSuccess: (state) => {
            state.successOpen = false;
        },
        setTime: (state, action: PayloadAction<number>) => {
            state.time = action.payload;
        },
        success: (state, action: PayloadAction<string>) => {
            state.successOpen = !state.successOpen;
            state.success = action.payload;
        },
        warn: (state, action: PayloadAction<string>) => {
            state.warningOpen = !state.warningOpen;
            state.warning = action.payload;
        },
    }
})

export const { toggleAward, toggleExpense, toggleInflow, toggleSettings, toggleStocks, toggleAnalytics, warn, closeWarn, closeSuccess, success, setTime } = modalSlice.actions

export default modalSlice.reducer