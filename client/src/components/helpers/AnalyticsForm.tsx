import React, { useState } from "react";
import FormSubmitBtn from "./FormSubmitBtn";

const AnalyticsForm: React.FC = () => {
  const [form, setForm] = useState({
    amount: 0,
    time: 0,
    period: 1,
    interest: "compound",
    rate: 0,
  });

  const handleForm = (e: any) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form className="p-4">
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
              value={form.amount}
              onChange={handleForm}
              required
              placeholder="0.0"
              className="w-full pl-8 pr-3 py-2.5 rounded-lg bg-gray-50 text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            />
          </div>
        </div>
        <div>
          <div className="w-full">
            <label
              htmlFor="time"
              className="block text-sm font-medium text-white mb-2"
            >
              Timeline
            </label>
            <div className="flex gap-2">
              <input
                id="time"
                name="time"
                type="number"
                step="1"
                min="0"
                value={form.time}
                onChange={handleForm}
                required
                placeholder="0"
                className="flex-3 w-full px-3 py-2.5 rounded-lg bg-gray-50 text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              />
              <select
                id="period"
                name="period"
                value={form.period}
                onChange={handleForm}
                required
                className="flex-2 w-full px-3 py-2.5 rounded-lg bg-gray-50 text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition appearance-none cursor-pointer"
              >
                <option value="1">years</option>
                <option value="12">months</option>
                <option value="4">quarters</option>
                <option value="2">half-year</option>
              </select>
            </div>
          </div>
        </div>
        <div>
          <label
            htmlFor="rate"
            className="block text-sm font-medium text-white mb-2"
          >
            Interest Rate
          </label>
          <div className="relative">
            <input
              id="rate"
              name="rate"
              type="number"
              step="0.01"
              min="0.00"
              value={form.rate}
              onChange={handleForm}
              required
              placeholder="0"
              className="flex-3 w-full px-3 py-2.5 rounded-lg bg-gray-50 text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pr-3">
              %
            </span>
          </div>
        </div>
        <div>
          <label
            htmlFor="interest"
            className="block text-sm font-medium text-white mb-2"
          >
            Interest
          </label>
          <select
            id="interest"
            name="interest"
            value={form.interest}
            onChange={handleForm}
            required
            className="flex-2 w-full px-3 py-2.5 rounded-lg bg-gray-50 text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition appearance-none cursor-pointer"
          >
            <option value="compound">compound</option>
            <option value="simple">simple</option>
          </select>
        </div>
      </div>
      <div className="py-4">
        <FormSubmitBtn func={() => {}} />
      </div>
    </form>
  );
};

export default AnalyticsForm;
