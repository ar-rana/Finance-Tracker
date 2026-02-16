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
            state.stocks = action.payload;
        },
        setExpenses: (state, action: PayloadAction<any[]>) => {
            state.expenses = action.payload;
        },
        setInflows: (state, action: PayloadAction<any[]>) => {
            state.inflows = action.payload;
        },
        setStock: (state, action: PayloadAction<any>) => {
            state.stocks.push(action.payload);
        },
        setInflow: (state, action: PayloadAction<any>) => {
            state.inflows.push(action.payload);
        },
        setExpense: (state, action: PayloadAction<any>) => {
            state.expenses.push(action.payload);
        },
    },
});

export const { setStocks, setExpenses, setInflows, setStock, setInflow, setExpense } = dataSlice.actions;

export default dataSlice.reducer;
