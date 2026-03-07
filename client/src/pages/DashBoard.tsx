import React, { useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import AddExpense from "../components/modal/AddExpense";
import AddInflow from "../components/modal/AddInflow";
import StocksModal from "../components/modal/StocksModal";
import BarGraph from "../components/charts/BarGraph";
import HollowPieChart from "../components/charts/HollowPieChart";
import LineGraph from "../components/charts/LineGraph";
import PieGraph from "../components/charts/PieGraph";
import RadarGraph from "../components/charts/RadarGraph";
import ScatterPlot from "../components/charts/ScatterPlot";
import DetailView from "../components/infoCards/DetailView";
import SettingsModal from "../components/modal/SettingsModal";
import AwardModal from "../components/modal/AwardModal";
import AwardsViewer from "../components/modal/AwardsViewer";
import BudgetMeter from "../components/charts/BudgetMeter";
import { useAppSelector, useAppDispatch } from "../hooks/reduxHooks";
import { getAllSettingData, getAnalyticsModalState } from "../redux/selectors";
import { getSettings } from "../api/userAPIs";
import { getInflows, getExpenses } from "../api/inflow-outflow";
import { Graphs } from "../types/Component";
import DraggableModal from "../components/modal/DraggableModal";
import { toggleAnalytics } from "../redux/modalSlice";
import AnalyticsForm from "../components/helpers/AnalyticsForm";
import { getExpenses as selectExpenses, getInflows as selectInflows } from "../redux/selectors";
import { parseBarLineData, parseLineData, parsePieData, parseIncomePieData, parseHollowPieData, parseOutflowHollowPieData, parseRadarData, parseCategoryBarData, parseScatterData } from "../utils/chartParsers";
import { setBarData, setLineData, setPieData, setExpensePieData, setIncomePieData, setHollowPieData, setInHollowPieData, setOutHollowPieData, setCategoryBarData, setRadarData, setInScatterData, setOutScatterData } from "../redux/chartSlice";

const DashBoard: React.FC = () => {
  const graphStyleClass = useRef<string>("w-full h-68 bg-transparent flex justify-center align-middle p-1.5");

  const dispatch = useAppDispatch();
  const settings = useAppSelector(getAllSettingData);
  const analyticsOpen = useAppSelector(getAnalyticsModalState);

  useEffect(() => {
    getSettings(dispatch);
  }, [dispatch]);

  useEffect(() => {
    if (settings.start && settings.end) {
      getInflows(settings.start, settings.end, dispatch);
      getExpenses(settings.start, settings.end, dispatch);
    }
  }, [settings.start, settings.end, dispatch]);

  const expensesState = useAppSelector(selectExpenses);
  const inflowsState = useAppSelector(selectInflows);

  useEffect(() => {
    // Re-calculate and set chart slice data whenever expenses/inflows change
    if (expensesState && inflowsState) {
      const barData = parseBarLineData(expensesState, inflowsState);
      dispatch(setBarData(barData));

      const lineData = parseLineData(expensesState, inflowsState);
      dispatch(setLineData(lineData));

      const pieData = parsePieData(expensesState);
      dispatch(setPieData(pieData));

      // Current-month-only splits for the dual PieGraph
      const currentMonth = new Date().toLocaleString("en-US", { month: "long" }).toLowerCase();
      dispatch(setExpensePieData(parsePieData(expensesState, currentMonth)));
      dispatch(setIncomePieData(parseIncomePieData(inflowsState, currentMonth)));

      const hollowPieData = parseHollowPieData(inflowsState);
      dispatch(setHollowPieData(hollowPieData));
      dispatch(setInHollowPieData(hollowPieData));

      const outHollowPieData = parseOutflowHollowPieData(expensesState);
      dispatch(setOutHollowPieData(outHollowPieData));

      const radarData = parseRadarData(expensesState, inflowsState);
      dispatch(setRadarData(radarData));

      const inScatterData = parseScatterData(inflowsState);
      dispatch(setInScatterData(inScatterData));

      const outScatterData = parseScatterData(expensesState);
      dispatch(setOutScatterData(outScatterData));

      const categoryBarData = parseCategoryBarData(expensesState, inflowsState);
      dispatch(setCategoryBarData(categoryBarData));
    }
  }, [expensesState, inflowsState, dispatch]);

  const settingCheck = (graph: string): boolean => {
    return settings.graphs.includes(graph);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-900 ml-12 overflow-x-hidden">
        {/* ml-12 to accommodate for the navbar*/}
        <AddExpense />
        <AddInflow />
        <StocksModal />
        <SettingsModal />
        <AwardModal />
        <AwardsViewer />
        <DraggableModal heading="Analytics" isOpen={analyticsOpen} thunk={toggleAnalytics}>
          <AnalyticsForm />
        </DraggableModal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-transparent pt-4">
          {settingCheck(Graphs.barGraph) && (
            <div className={graphStyleClass.current}>
              <BarGraph />
            </div>
          )}
          {settingCheck(Graphs.hollowPieChart) && (
            <div className={graphStyleClass.current}>
              <HollowPieChart />
            </div>
          )}
          {settingCheck(Graphs.lineGraph) && (
            <div className={graphStyleClass.current}>
              <LineGraph />
            </div>
          )}
          {settingCheck(Graphs.pieChart) && (
            <div className={graphStyleClass.current}>
              <PieGraph />
            </div>
          )}
          {settingCheck(Graphs.radarChart) && (
            <div className={graphStyleClass.current}>
              <RadarGraph />
            </div>
          )}
          {settingCheck(Graphs.scatterPlot) && (
            <div className={graphStyleClass.current}>
              <ScatterPlot />
            </div>
          )}
          {settingCheck(Graphs.budgetMeter) && (
            <div className={graphStyleClass.current}>
              <BudgetMeter />
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <DetailView />
        </div>
      </div>
    </>
  );
};

export default DashBoard;
