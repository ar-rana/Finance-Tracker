import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Slices, type ChartState } from "../types/ReduxData";

const initialState: ChartState = {
    pieData: [],
    expensePieData: [],
    incomePieData: [],
    hollowPieData: [],
    inHollowPieData: [],
    outHollowPieData: [],
    categoryBarData: [],
    barData: [],
    lineData: [],
    inScatterData: [],
    outScatterData: [],
    radarData: []
};

export const chartSlice = createSlice({
    name: Slices.chart,
    initialState: initialState,
    reducers: {
        setPieData: (state, action: PayloadAction<any[]>) => {
            state.pieData = action.payload;
        },
        setExpensePieData: (state, action: PayloadAction<any[]>) => {
            state.expensePieData = action.payload;
        },
        setIncomePieData: (state, action: PayloadAction<any[]>) => {
            state.incomePieData = action.payload;
        },
        setHollowPieData: (state, action: PayloadAction<any[]>) => {
            state.hollowPieData = action.payload;
        },
        setInHollowPieData: (state, action: PayloadAction<any[]>) => {
            state.inHollowPieData = action.payload;
        },
        setOutHollowPieData: (state, action: PayloadAction<any[]>) => {
            state.outHollowPieData = action.payload;
        },
        setCategoryBarData: (state, action: PayloadAction<any[]>) => {
            state.categoryBarData = action.payload;
        },
        setBarData: (state, action: PayloadAction<any[]>) => {
            state.barData = action.payload;
        },
        setLineData: (state, action: PayloadAction<any[]>) => {
            state.lineData = action.payload;
        },
        setInScatterData: (state, action: PayloadAction<any[]>) => {
            state.inScatterData = action.payload;
        },
        setOutScatterData: (state, action: PayloadAction<any[]>) => {
            state.outScatterData = action.payload;
        },
        setRadarData: (state, action: PayloadAction<any[]>) => {
            state.radarData = action.payload;
        },
        setAllChartData: (_, action: PayloadAction<ChartState>) => {
            return action.payload;
        }
    }
});

export const { setPieData, setExpensePieData, setIncomePieData, setCategoryBarData, setHollowPieData, setInHollowPieData, setOutHollowPieData, setBarData, setLineData, setInScatterData, setOutScatterData, setRadarData, setAllChartData } = chartSlice.actions;

export default chartSlice.reducer;
