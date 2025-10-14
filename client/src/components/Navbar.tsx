import React, { useState } from "react";

interface NavInterface {
  setExpenseOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setInflowOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setStocksOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar: React.FC<NavInterface> = (props) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  
  return (
    <div className="flex h-screen bg-transparent max-h-screen fixed z-100">
      <div
        className={`bg-white border-r border-gray-200 transition-all duration-300 flex flex-col h-full ${
          expanded ? "w-48" : "w-12"
        } shadow-lg`}
      >
        <button
          className="p-2 focus:outline-none hover:bg-green-50 font-bold"
          onClick={() => setExpanded((prev) => !prev)}
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
                className="w-full text-left flex items-center h-10 px-4 py-2 hover:bg-green-50 rounded transition"
              >
                <i className="fa fa-pie-chart text-green-600 text-center" />
                {expanded && <span className="ml-3 text-gray-800 text-sm font-semibold">Analytics</span>}
              </button>
            </li>
            <li className="mb-1">
              <button
                className="w-full text-left flex items-center h-10 px-4 py-2 hover:bg-green-50 rounded transition"
              >
                <i className="fa fa-calendar-o text-green-600 text-center" />
                {expanded && <span className="ml-3 text-gray-800 text-sm font-semibold">Global Timeline</span>}
              </button>
            </li>
            <li className="mb-1">
              <button 
                onClick={() => props.setExpenseOpen(prev => !prev)}
                className="w-full text-left flex items-center h-10 px-4 py-2 hover:bg-green-50 rounded transition"
              >
                <i className="fa fa-credit-card text-green-600 text-center" />
                {expanded && <span className="ml-3 text-gray-800 text-sm font-semibold" >Add Expense</span>}
              </button>
            </li>
            <li className="mb-1">
              <button 
                onClick={() => props.setInflowOpen(prev => !prev)}
                className="w-full text-left flex items-center h-10 px-4 py-2 hover:bg-green-50 rounded transition"
              >
                <i className="fa fa-money text-green-600 text-center" />
                {expanded && <span className="ml-3 text-gray-800 text-sm font-semibold">Add Inflow</span>}
              </button>
            </li>
            <li className="mb-1">
              <button 
                onClick={() => props.setStocksOpen(prev => !prev)}
                className="w-full text-left flex items-center h-10 px-4 py-2 hover:bg-green-50 rounded transition"
              >
                <i className="fa fa-bar-chart text-green-600 text-center" />
                {expanded && <span className="ml-3 text-gray-800 text-sm font-semibold">Stock Screening</span>}
              </button>
            </li>

            <li className="mb-2 mt-auto">
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
