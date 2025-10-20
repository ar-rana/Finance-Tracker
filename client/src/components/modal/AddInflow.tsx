import React, { useState } from "react";
import Modal from "react-modal";
import type { InflowForm } from "../../types/FormsData";
import FormSubmitBtn from "../buttons/FormSubmitBtn";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { getInflowModalState } from "../../redux/selectors";
import { toggleInflow } from "../../redux/modalSlice";

const AddInflow: React.FC = () => {
  const dispatch = useAppDispatch();
  const openState = useAppSelector(getInflowModalState);

  const [inflowData, setInflowData] = useState<InflowForm>({
    amount: "",
    description: "",
    month: "",
    source: "",
    year: "",
  });

  const handleFormData = (e: any): void => {
    const { name, value } = e.target;
    setInflowData({
      ...inflowData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // props.setOpen(false);
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
      onRequestClose={() => dispatch(toggleInflow())}
      ariaHideApp={false}
    >
      <div className="bg-gradient-to-r bg-gray-700 px-6 py-3 flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Add Money Inflow</h2>
        <i
          className="font-bold fa fa-close text-white hover:text-gray-400"
          onClick={() => dispatch(toggleInflow())}
        />
      </div>

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
                  value={inflowData.amount}
                  onChange={handleFormData}
                  required
                  placeholder="0.0"
                  className="w-full pl-8 pr-3 py-2.5 rounded-lg bg-gray-50 text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="source"
                className="block text-sm font-medium text-white mb-2"
              >
                Source
              </label>
              <select
                id="source"
                name="source"
                value={inflowData.source}
                onChange={handleFormData}
                required
                className="w-full px-3 py-2.5 rounded-lg bg-gray-50 text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition appearance-none cursor-pointer"
              >
                <option value="">Select</option>
                <option value="Salary">Salary</option>
                <option value="Gift">Gift</option>
                <option value="Stocks">Stocks</option>
                <option value="SIP_MF">SIP/MF</option>
                <option value="Last_Month_Carry">Carry From Last Month</option>
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
                value={inflowData.month}
                onChange={handleFormData}
                required
                className="w-full px-3 py-2.5 rounded-lg bg-gray-50 text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition appearance-none cursor-pointer"
              >
                <option value="">Select</option>
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
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
                value={inflowData.year}
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
            value={inflowData.description}
            onChange={handleFormData}
            rows={2}
            placeholder="Add notes..."
            className="w-full px-3 py-2.5 rounded-lg bg-gray-50 text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none"
          />

          <FormSubmitBtn func={() => {}} />
        </form>
      </div>
    </Modal>
  );
};

export default AddInflow;
