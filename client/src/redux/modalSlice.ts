import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Slices, type ReduxModalState } from "../types/SliceData";

const initialState: ReduxModalState = {
    awardOpen: false,
    inflowOpen: false,
    expenseOpen: false,
    settingsOpen: false,
    stocksOpen: false,
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
        // incByVal: (state, action: PayloadAction<number>) => {
        //     state.value += action.payload
        // },
    } 
})

export const { toggleAward, toggleExpense, toggleInflow, toggleSettings, toggleStocks } = modalSlice.actions

export default modalSlice.reducer