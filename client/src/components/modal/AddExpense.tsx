import React, { useState, useEffect } from "react";
import type { AddExpenseForm } from "../../types/FormsData";
import { ExpenseCategories } from "../../types/FormsData";
import FormSubmitBtn from "../helpers/FormSubmitBtn";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { getExpenseModalState } from "../../redux/selectors";
import { toggleExpense } from "../../redux/modalSlice";
import { addExpense } from "../../api/inflow-outflow";
import { warn } from "../../redux/modalSlice";
import DraggableModal from "./DraggableModal";

const AddExpense: React.FC = () => {
  const dispatch = useAppDispatch();
  const openState = useAppSelector(getExpenseModalState);

  const [expenseData, setExpenseData] = useState<AddExpenseForm>({
    amount: 0,
    description: "",
    month: "",
    category: "",
    year: "",
    day: "",
  });

  useEffect(() => {
    if (openState) {
      const now = new Date();
      const monthNames = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
      setExpenseData(prev => ({
        ...prev,
        month: monthNames[now.getMonth()],
        year: now.getFullYear().toString(),
        day: "", // Reset day or keep it optional
      }));
    }
  }, [openState]);

  const handleFormData = (e: any): void => {
    const { name, value } = e.target;
    setExpenseData({
      ...expenseData,
      [name]: value,
    });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Number(expenseData.amount) <= 0) {
      dispatch(warn("Invalid Amount Argument"));
      return;
    }

    addExpense({
      ...expenseData,
      amount: Number(expenseData.amount),
      day: Number(expenseData.day) || 0
    }, dispatch);

    // dispatch(toggleExpense());
    setExpenseData({
      amount: 0,
      description: "",
      month: "",
      category: "",
      year: "",
      day: "",
    });
  };

  return (
    <DraggableModal heading="Add Expenses" isOpen={openState} thunk={toggleExpense}>
      <div className="p-4 h-max">
        <form className="space-y-2">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-white mb-2"
              >
                Amount
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  ₹
                </span>
                <input
                  id="amount"
                  name="amount"
                  type="number"
                  step="0.1"
                  min="0"
                  value={expenseData.amount}
                  onChange={handleFormData}
                  required
                  placeholder="0.0"
                  className="w-full pl-8 pr-3 py-2.5 rounded-lg bg-gray-50 text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="type"
                className="block text-sm font-medium text-white mb-2"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                value={expenseData.category}
                onChange={handleFormData}
                required
                className="w-full px-3 py-2.5 rounded-lg bg-gray-50 text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition appearance-none cursor-pointer"
              >
                <option value="">Select</option>
                {ExpenseCategories.map((cat) => (
                  <option key={cat} value={cat}>{cat.replace("_", " ")}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="month"
                className="block text-sm font-medium text-white mb-2"
              >
                Month
              </label>
              <select
                id="month"
                name="month"
                value={expenseData.month}
                onChange={handleFormData}
                required
                className="w-full px-3 py-2.5 rounded-lg bg-gray-50 text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition appearance-none cursor-pointer"
              >
                <option value="">Select</option>
                <option value="january">January</option>
                <option value="february">February</option>
                <option value="march">March</option>
                <option value="april">April</option>
                <option value="may">May</option>
                <option value="june">June</option>
                <option value="july">July</option>
                <option value="august">August</option>
                <option value="september">September</option>
                <option value="october">October</option>
                <option value="november">November</option>
                <option value="december">December</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="year"
                className="block text-sm font-medium text-white mb-2"
              >
                Year
              </label>
              <input
                id="year"
                name="year"
                type="number"
                value={expenseData.year}
                onChange={handleFormData}
                required
                placeholder="0000"
                className="w-full px-3 py-2.5 rounded-lg bg-gray-50 text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              />
            </div>

            <div>
              <label
                htmlFor="day"
                className="block text-sm font-medium text-white mb-2"
              >
                Day
              </label>
              <div className="relative">
                <input
                  id="day"
                  name="day"
                  type="number"
                  min="1"
                  max="31"
                  value={expenseData.day}
                  onChange={handleFormData}
                  placeholder="DD"
                  className="w-full px-3 py-2.5 rounded-lg bg-gray-50 text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition pr-10"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 w-6 h-6 overflow-hidden">
                  <input
                    type="date"
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    onChange={(e) => {
                      const date = new Date(e.target.value);
                      if (!isNaN(date.getTime())) {
                        const day = date.getDate();
                        const year = date.getFullYear();
                        const monthNames = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
                        const month = monthNames[date.getMonth()];
                        setExpenseData({
                          ...expenseData,
                          day,
                          month,
                          year: year.toString(),
                        });
                      }
                    }}
                  />
                  <i className="fa fa-calendar w-full h-full flex items-center justify-center pointer-events-none text-gray-500"></i>
                </div>
              </div>
            </div>
          </div>

          <label
            htmlFor="description"
            className="block text-sm font-medium text-white mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={expenseData.description}
            onChange={handleFormData}
            rows={2}
            placeholder="Add notes..."
            className="w-full px-3 py-2.5 rounded-lg bg-gray-50 text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none"
          />

          <FormSubmitBtn func={onSubmit} />
        </form>
      </div>
    </DraggableModal>
  );
};

export default AddExpense;
