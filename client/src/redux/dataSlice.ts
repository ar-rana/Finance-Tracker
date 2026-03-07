import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Slices, type DataState } from "../types/ReduxData";

const initialState: DataState = {
    stocks: [],
    expenses: [],
    inflows: [],
};

export const dataSlice = createSlice({
    name: Slices.data,
    initialState: initialState,
    reducers: {
        setStocks: (state, action: PayloadAction<any[]>) => {
            state.stocks = action.payload || [];
        },
        setExpenses: (state, action: PayloadAction<any[]>) => {
            state.expenses = action.payload || [];
        },
        setInflows: (state, action: PayloadAction<any[]>) => {
            state.inflows = action.payload || [];
        },
        setStock: (state, action: PayloadAction<any>) => {
            if (!state.stocks) state.stocks = [];
            state.stocks.push(action.payload);
        },
        setInflow: (state, action: PayloadAction<any>) => {
            if (!state.inflows) state.inflows = [];
            state.inflows.push(action.payload);
        },
        setExpense: (state, action: PayloadAction<any>) => {
            if (!state.expenses) state.expenses = [];
            state.expenses.push(action.payload);
        },
        removeExpenseById: (state, action: PayloadAction<string>) => {
            state.expenses = state.expenses.filter((e: any) => e.id !== action.payload);
        },
        removeInflowById: (state, action: PayloadAction<string>) => {
            state.inflows = state.inflows.filter((i: any) => i.id !== action.payload);
        },
    },
});

export const { setStocks, setExpenses, setInflows, setStock, setInflow, setExpense, removeExpenseById, removeInflowById } = dataSlice.actions;

export default dataSlice.reducer;
