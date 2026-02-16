import React, { useState } from "react";
import Modal from "react-modal";
import type { AddExpenseForm } from "../../types/FormsData";
import FormSubmitBtn from "../helpers/FormSubmitBtn";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { getExpenseModalState } from "../../redux/selectors";
import { toggleExpense } from "../../redux/modalSlice";
import FormHeader from "../helpers/FormHeader";
import { addExpense } from "../../api/inflow-outflow";
import { warn } from "../../redux/modalSlice";

const AddExpense: React.FC = () => {
  const dispatch = useAppDispatch();
  const openState = useAppSelector(getExpenseModalState);

  const [expenseData, setExpenseData] = useState<AddExpenseForm>({
    amount: 0,
    description: "",
    month: "",
    category: "",
    year: "",
  });

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
      amount: Number(expenseData.amount)
    }, dispatch);

    // dispatch(toggleExpense());
    setExpenseData({
      amount: 0,
      description: "",
      month: "",
      category: "",
      year: "",
    });
  };

  return (
    <Modal
      className="z-10 fixed h-[45%] w-[50%] left-1/2 right-1/2 transform -translate-x-1/2 translate-y-1/2 shadow-2xl rounded-2xl overflow-auto bg-gray-800 border-2 border-white scrollbar-hide"
      style={{
        overlay: {
          backgroundColor: "transparent",
        },
      }}
      isOpen={openState}
      onRequestClose={() => dispatch(toggleExpense())}
      ariaHideApp={false}
    >
      <FormHeader thunk={toggleExpense} heading="Add Expenses" />

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
                <option value="Investment">Investment</option>
                <option value="Policies">Policies</option>
                <option value="Home">Home Expense</option>
                <option value="Loan_Saving">Loan Saving</option>
                <option value="Travel">Travel</option>
                <option value="Miscellaneous">Miscellaneous</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
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
    </Modal>
  );
};

export default AddExpense;
