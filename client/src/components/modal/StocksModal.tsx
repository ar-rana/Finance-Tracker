import React, { useState } from "react";
import type { ModalState } from "../../types/Component";
import Modal from "react-modal";
import type { StocksFormData } from "../../types/FormsData";
import FormSubmitBtn from "../buttons/FormSubmitBtn";

const StocksModal: React.FC<ModalState> = (props) => {
  const [stockData, setStockData] = useState<StocksFormData>({
    amount: '',
    date: '',
    description: '',
    status: ''
  });

  const handleFormData = (e: any): void => {
    const { name, value } = e.target;
    setStockData({
      ...stockData,
      [name]: value,
    });
  }

  if (!props.open) return null;
  return (
    <Modal
      className="z-101 fixed h-[45%] w-[50%] left-1/2 right-1/2 transform -translate-x-1/2 translate-y-1/2 shadow-2xl rounded-2xl overflow-auto bg-gray-800 border-2 border-white scrollbar-hide"
      style={{
        overlay: {
          backgroundColor: "transparent",
        },
      }}
      isOpen={props.open}
      onRequestClose={() => props.setOpen(false)}
      ariaHideApp={false}
    >
      <div className="bg-gradient-to-r bg-gray-700 px-6 py-3 flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Stocks Tracking</h2>
        <i
          className="font-bold fa fa-close text-white hover:text-gray-400"
          onClick={() => props.setOpen((prev) => !prev)}
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
                  value={stockData.amount}
                  onChange={handleFormData}
                  required
                  placeholder="0.0"
                  className="w-full pl-8 pr-3 py-2.5 rounded-lg bg-gray-50 text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-white mb-2"
              >
                Source
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={stockData.date}
                onChange={handleFormData}
                required
                className="w-full px-3 py-2.5 rounded-lg bg-gray-50 text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition appearance-none cursor-pointer"
              ></input>
            </div>
          </div>

          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-white mb-2"
            >
              Sold/Bought
            </label>
            <select
              id="status"
              name="status"
              value={stockData.status}
              onChange={handleFormData}
              required
              className="w-full px-3 py-2.5 rounded-lg bg-gray-50 text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition appearance-none cursor-pointer"
            >
              <option value="">Select</option>
              <option value="Sold">Sold</option>
              <option value="Bought">Bought</option>
            </select>
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
            value={stockData.description}
            onChange={handleFormData}
            rows={1}
            placeholder="Add notes..."
            className="w-full px-3 py-2.5 rounded-lg bg-gray-50 text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none"
          />

          <FormSubmitBtn func={() => {}}/>
        </form>
      </div>
    </Modal>
  );
};

export default StocksModal;
