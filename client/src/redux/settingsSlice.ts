import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Slices, type ReduxSettingState } from "../types/ReduxData";
import type { SettingsForm } from "../types/FormsData";

const initialState: ReduxSettingState = {
  settings: {
    start: "",
    end: "",
    budget: "",
    graphs: ["Bar_Graphs", "Radar_Chart", "Pie_Chart", "Hollow_Pie_Chart", "Line_Graph", "Scatter_Plot", "Budget_Meter"],
  },
};

export const settingsSlice = createSlice({
  name: Slices.settings,
  initialState: initialState,
  reducers: {
    allSettings: (state, action: PayloadAction<SettingsForm>) => {
        state.settings = action.payload;
        console.log(state.settings);
    },
    setGraphs: (state, action: PayloadAction<string[]>) => {
      state.settings.graphs = action.payload;
    }
  },
});

export const { allSettings, setGraphs } = settingsSlice.actions;

export default settingsSlice.reducer;
