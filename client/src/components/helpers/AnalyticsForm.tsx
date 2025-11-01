import React, { useState } from "react";
import type { AnalyticsFormState } from "../../types/FormsData";
import useDebounce from "../../hooks/useDebounce";

const AnalyticsForm: React.FC = () => {
  const [form, setForm] = useState<AnalyticsFormState>({
    amount: 0,
    time: 0,
    period: 1,
    interest: "compound",
    rate: 0,
  });
  const [result, setResult] = useState<number>(0.0);

  const handleForm = (e: any) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAnalysis = () => {
    const principal = Number(form.amount);
    const rate = Number(form.rate);
    const period = Number(form.period);
    const time = Number(form.time);
    console.log(
      `P: ${principal}, R: ${rate}, period: ${period}, time: ${time}`
    );
    let T = time / period;
    console.log("years: ", T);

    let result: number;
    try {
      if (form.interest === "compound") {
        const CI = principal * Math.pow(1 + ((rate / 100) / period), period * T);
        result = CI - principal;
      } else {
        const SI = (principal * rate * time) / 100;
        result = SI; 
      }
      setResult(Number(result.toFixed(4)));
    } catch (err) {
      console.log("Invalid Input");
      setResult(0.0);
    }
  };

  const debounce = useDebounce({ func: handleAnalysis, timer: 700 });

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
                <option value="2">half-yearly</option>
              </select>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center gap-2">
          <div className="flex-1 relative">
            <label
              htmlFor="rate"
              className="block text-sm font-medium text-white mb-2"
            >
              Interest Rate
            </label>
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
            <span className="absolute right-3 top-[68%] -translate-y-1/2 text-gray-500 pr-3">
              %
            </span>
          </div>
          <div className="flex-1">
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
        <div className="flex gap-2">
          <div>
            <label
              htmlFor="result"
              className="block text-sm font-medium text-white mb-2"
            >
              Returns
            </label>
            <input
              id="result"
              name="result"
              type="number"
              value={result}
              // placeholder="result"
              disabled
              className="cursor-not-allowed flex-3 w-full px-3 py-2.5 rounded-lg bg-gray-300 text-gray-900 border border-gray-300 focus:outline-none focus:border-transparent"
            />
          </div>
          <div>
            <label
              htmlFor="result"
              className="block text-sm font-medium text-white mb-2"
            >
              Total Amount
            </label>
            <input
              id="result"
              name="result"
              type="number"
              value={Number(form.amount) + Number(result)}
              // placeholder="result"
              disabled
              className="cursor-not-allowed flex-3 w-full px-3 py-2.5 rounded-lg bg-gray-300 text-gray-900 border border-gray-300 focus:outline-none focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default AnalyticsForm;
