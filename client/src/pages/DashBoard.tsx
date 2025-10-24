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
import BudgetMeter from "../components/charts/BudgetMeter";
import { useAppSelector } from "../hooks/reduxHooks";
import { getAllSettingData, getAnalyticsModalState } from "../redux/selectors";
import { Graphs } from "../types/Component";
import DraggableModal from "../components/modal/DraggableModal";
import { toggleAnalytics } from "../redux/modalSlice";
import AnalyticsForm from "../components/helpers/AnalyticsForm";

const DashBoard: React.FC = () => {
  const graphStyleClass = useRef<string>("w-full h-68 bg-transparent flex justify-center align-middle p-1.5");

  const settings = useAppSelector(getAllSettingData);
  const analyticsOpen = useAppSelector(getAnalyticsModalState);

  useEffect(() => {
    console.log(settings.graphs.includes(Graphs.barGraph));
  }, [settings]);

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
