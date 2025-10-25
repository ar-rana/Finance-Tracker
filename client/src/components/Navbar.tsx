import React, { useState } from "react";
import { useAppDispatch } from "../hooks/reduxHooks";
import { toggleAnalytics, toggleAward, toggleExpense, toggleInflow, toggleSettings, toggleStocks } from "../redux/modalSlice";
import { setDates } from "../redux/settingsSlice";

const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();

  const [expanded, setExpanded] = useState<boolean>(false);
  const [timeline, setTimeline] = useState<boolean>(false);

  const handleGlobalTimeline = (timeline: string) => {
    let start;
    let end: Date | string = new Date();
    if (timeline === "week") {
      const day = end.getDay();
      start = new Date();
      start.setDate(end.getDate() - day);
    } else if (timeline === "month") {
      start = new Date(end.getFullYear(), end.getMonth(), 1);
    } else if (timeline === "year") {
      start = new Date(end.getFullYear(), 0, 1);
    } else {
      dispatch(toggleSettings());
      return;
    }
    const pad = (n: number) => String(n).padStart(2, "0");
    start = `${start.getFullYear()}-${pad(start.getMonth() + 1)}-${pad(start.getDate())}`;
    end = `${end.getFullYear()}-${pad(end.getMonth() + 1)}-${pad(end.getDate())}`;
    console.log("start: ", start);
    console.log("end: ", end);
    dispatch(setDates({ start, end }));
  }
  
  return (
    <div className="flex h-screen bg-transparent max-h-screen fixed z-100">
      <div
        className={`bg-white border-r border-gray-200 transition-all duration-300 flex flex-col h-full ${
          expanded ? "w-48" : "w-12"
        } shadow-lg`}
      >
        <button
          className="p-2 focus:outline-none hover:bg-green-50 font-bold"
          onClick={() => {
            setTimeline(false);
            setExpanded((prev) => !prev);
          }}
        >
          <i
            className={`fa ${
              expanded ? "fa-angle-left" : "fa-angle-right"
            } text-green-600 text-xl fa-lg`}
          />
        </button>
        <nav className="flex-1 mt-4">
          <ul className="flex flex-col h-full">
            <li className="mb-1">
              <button
                onClick={() => dispatch(toggleAward())}
                className="w-full text-left flex items-center h-10 px-4 py-2 hover:bg-green-50 rounded transition"
              >
                <i className="fa fa-trophy text-green-600 text-center" />
                {expanded && <span className="ml-3 text-gray-800 text-sm font-semibold">Awards</span>}
              </button>
            </li>
            <li className="mb-1 flex flex-col">
              <button
                className="w-full text-left flex items-center h-10 px-4 py-2 hover:bg-green-50 rounded transition"
              >
                <i className="fa fa-calendar text-green-600 text-center" />
                {expanded && <span className="ml-3 text-gray-800 text-sm font-semibold" onClick={() => setTimeline(prev => !prev)}>Global Timeline</span>}
              </button>
              {timeline && (
                  <ul className="flex flex-col text-sm">
                    <li onClick={() => handleGlobalTimeline("week")} className="text-left flex items-center ml-9 px-2 font-mono hover:bg-gray-100 cursor-pointer">This Week</li>
                    <li onClick={() => handleGlobalTimeline("month")} className="text-left flex items-center ml-9 px-2 font-mono hover:bg-gray-100 cursor-pointer">This Month</li>
                    <li onClick={() => handleGlobalTimeline("year")} className="text-left flex items-center ml-9 px-2 font-mono hover:bg-gray-100 cursor-pointer">This Year</li>
                    <li onClick={() => handleGlobalTimeline("")} className="text-left flex items-center ml-9 px-2 font-mono hover:bg-gray-100 cursor-pointer">Custome</li>
                  </ul>
                )
              }
            </li>
            <li className="mb-1">
              <button 
                onClick={() => dispatch(toggleExpense())}
                className="w-full text-left flex items-center h-10 px-4 py-2 hover:bg-green-50 rounded transition"
              >
                <i className="fa fa-credit-card text-green-600 text-center" />
                {expanded && <span className="ml-3 text-gray-800 text-sm font-semibold" >Add Expense</span>}
              </button>
            </li>
            <li className="mb-1">
              <button 
                onClick={() => dispatch(toggleInflow())}
                className="w-full text-left flex items-center h-10 px-4 py-2 hover:bg-green-50 rounded transition"
              >
                <i className="fa fa-money text-green-600 text-center" />
                {expanded && <span className="ml-3 text-gray-800 text-sm font-semibold">Add Inflow</span>}
              </button>
            </li>
            <li className="mb-1">
              <button 
                onClick={() => dispatch(toggleStocks())}
                className="w-full text-left flex items-center h-10 px-4 py-2 hover:bg-green-50 rounded transition"
              >
                <i className="fa fa-bar-chart text-green-600 text-center" />
                {expanded && <span className="ml-3 text-gray-800 text-sm font-semibold">Investment Analysis</span>} 
                {/* fetch all BSE & NSE stocks from somewhere */}
              </button>
            </li>
            <li className="mb-1">
              <button 
                onClick={() => dispatch(toggleAnalytics())}
                className="w-full text-left flex items-center h-10 px-4 py-2 hover:bg-green-50 rounded transition"
              >
                <i className="fa fa-wpexplorer text-green-600 text-center" />
                {expanded && <span className="ml-3 text-gray-800 text-sm font-semibold">Returns Forecasting</span>}
              </button>
            </li>

            <li className="mt-auto">
              <button onClick={() => dispatch(toggleSettings())} className="w-full text-left flex items-center h-10 px-4 py-4 hover:bg-green-50 rounded transition">
                <i className="fa fa-cog text-green-600 text-center" />
                {expanded && <span className="ml-3 text-gray-800 text-sm font-bold">Settings</span>}
              </button>
            </li>
            <li className="mb-2">
              <button className="w-full text-left flex items-center h-10 px-4 py-4 hover:bg-red-50 rounded transition">
                <i className="fa fa-sign-out text-red-600 text-center" />
                {expanded && <span className="ml-3 text-gray-800 text-sm font-bold">Logout</span>}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
