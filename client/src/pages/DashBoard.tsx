import React, { useRef, useState } from "react";
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

const DashBoard: React.FC = () => {
  const graphStyleClass = useRef<string>("w-full h-68 bg-transparent flex justify-center align-middle p-1.5");
  const [expenseOpen, setExpenseOpen] = useState<boolean>(false);
  const [inflowOpen, setInflowOpen] = useState<boolean>(false);
  const [stocksOpen, setStocksOpen] = useState<boolean>(false);
  const [settingsOpen, setSetttingsOpen] = useState<boolean>(false);

  return (
    <>
      <Navbar setExpenseOpen={setExpenseOpen} setInflowOpen={setInflowOpen} setStocksOpen={setStocksOpen} setSettingsOpen={setSetttingsOpen} />
      <div className="min-h-screen bg-gray-900 ml-12 overflow-x-hidden"> {/* ml-12 to accommodate for the navbar*/}
        <AddExpense open={expenseOpen} setOpen={setExpenseOpen} />
        <AddInflow open={inflowOpen} setOpen={setInflowOpen} />
        <StocksModal open={stocksOpen} setOpen={setStocksOpen} />
        <SettingsModal open={settingsOpen} setOpen={setSetttingsOpen} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-transparent pt-4">
          <div className={graphStyleClass.current}>
            <BarGraph />
          </div>
          <div className={graphStyleClass.current}>
            <HollowPieChart />
          </div>
          <div className={graphStyleClass.current}>
            <LineGraph />
          </div>
          <div className={graphStyleClass.current}>
            <PieGraph />
          </div>
          <div className={graphStyleClass.current}>
            <RadarGraph />
          </div>
          <div className={graphStyleClass.current}>
            <ScatterPlot />
          </div>
        </div>
        <div className="flex flex-col">
          <DetailView />
        </div>
      </div>
    </>
  );
};

export default DashBoard;
