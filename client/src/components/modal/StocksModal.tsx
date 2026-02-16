import React, { useState } from "react";
import Modal from "react-modal";
import type { StocksFormData } from "../../types/FormsData";
import FormSubmitBtn from "../helpers/FormSubmitBtn";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { getStocksModalState } from "../../redux/selectors";
import { toggleStocks } from "../../redux/modalSlice";
import FormHeader from "../helpers/FormHeader";
import { addStock } from "../../api/stock";

const StocksModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const openState = useAppSelector(getStocksModalState);

  const [stockData, setStockData] = useState<StocksFormData>({
    price: 0,
    date: "",
    company: "",
    description: "",
    status: "",
    quantity: 0,
  });

  const handleFormData = (e: any): void => {
    const { name, value } = e.target;
    setStockData({
      ...stockData,
      [name]: value,
    });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Format date from YYYY-MM-DD to DD/MM/YYYY
    const [year, month, day] = stockData.date.split("-");
    const formattedDate = `${day}/${month}/${year}`;

    console.log("curr stockData", stockData);
    console.log("formattedDate", formattedDate);

    addStock({
      ...stockData,
      price: Number(stockData.price),
      quantity: Number(stockData.quantity),
      date: formattedDate
    }, dispatch);

    dispatch(toggleStocks());
    // Reset form
    setStockData({
      price: 0,
      date: "",
      company: "",
      description: "",
      status: "",
      quantity: 0,
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
      onRequestClose={() => dispatch(toggleStocks())}
      ariaHideApp={false}
    >
      <FormHeader thunk={toggleStocks} heading="Stocks Tracking" />

      <div className="p-4 h-max">
        <form className="space-y-2">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-white mb-2"
              >
                Price
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  ₹
                </span>
                <input
                  id="price"
                  name="price"
                  type="number"
                  step="0.1"
                  min="0"
                  value={stockData.price}
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
                Date
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
              htmlFor="company"
              className="block text-sm font-medium text-white mb-2"
            >
              Company
            </label>
            <input
              id="company"
              name="company"
              value={stockData.company}
              onChange={handleFormData}
              required
              className="w-full px-3 py-2.5 rounded-lg bg-gray-50 text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            />
          </div>
          <div className="flex justify-center items-center gap-4 ">
            <div className="flex-1">
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-white mb-2"
              >
                Quantity
              </label>
              <input
                id="quantity"
                name="quantity"
                type="number"
                min="0"
                step="1"
                value={stockData.quantity}
                onChange={handleFormData}
                required
                className="w-full px-3 py-2.5 rounded-lg bg-gray-50 text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              />
            </div>

            <div className="flex-1">
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

          <FormSubmitBtn func={onSubmit} />
        </form>
      </div>
    </Modal>
  );
};

export default StocksModal;
