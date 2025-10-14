import React, { useState } from "react";
import Navbar from "../components/Navbar";
import AddExpense from "../components/modal/AddExpense";
import AddInflow from "../components/modal/AddInflow";
import StocksModal from "../components/modal/StocksModal";

const DashBoard: React.FC = () => {
  const [expenseOpen, setExpenseOpen] = useState<boolean>(false);
  const [inflowOpen, setInflowOpen] = useState<boolean>(false);
  const [stocksOpen, setStocksOpen] = useState<boolean>(false);

  return (
    <>
      <Navbar setExpenseOpen={setExpenseOpen} setInflowOpen={setInflowOpen} setStocksOpen={setStocksOpen} />
      <div className="min-h-screen bg-gray-900 ml-12"> {/* ml-12 to accommodate for the navbar*/}
        <AddExpense open={expenseOpen} setOpen={setExpenseOpen} />
        <AddInflow open={inflowOpen} setOpen={setInflowOpen} />
        <StocksModal open={stocksOpen} setOpen={setStocksOpen} />
      </div>
    </>
  );
};

export default DashBoard;
