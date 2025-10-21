export interface AppContextState {
  setWarning: React.Dispatch<React.SetStateAction<string>>;
}

export interface ModalState {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface FormButton {
  func: (...args: any[]) => void;
}

export interface FormHeaderState {
  heading: string;
  thunk: any;
}

export interface Debounce {
  func?: any;
  thunk?: any;
  timer?: number; // milliseconds
  payload?: any;
}

export const Graphs = {
  barGraph: "Bar_Graphs",
  radarChart: "Radar_Chart",
  hollowPieChart: "Hollow_Pie_Chart",
  pieChart: "Pie_Chart",
  scatterPlot: "Scatter_Plot",
  lineGraph: "Line_Graph",
  budgetMeter: "Budget_Meter",
};
