import React from "react";
import LatestEntry from "./LatestEntry";

const DetailView: React.FC = () => {
  // const [entry, setEntry] = useState<any[]>([]);
  // const [filter, setFilter] = useState<any>();

  const a = 0;
  return (
    <div className="w-full p-4 bg-gray-700">
      <div className="p-4 bg-gray-600 space-y-4 rounded-2xl">
        <div className="flex justify-between items-center flex-col sm:flex-row">
          <h2 className="text-white text-md font-medium items-center">Detailed View</h2>
          <div className="flex gap-4 text-md font-medium bg-white p-2 rounded-lg">
            <h2 className="text-green-600 bg-green-50 p-2 rounded-lg">Total Inflow: {a}</h2>
            <h2 className="text-red-600 bg-red-50 p-2 rounded-lg">Total Outflow: {a}</h2>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-evenly gap-4 p-0 m-0">
          <div className="flex justify-evenly space-x-4 p-0 m-0 w-full">
            <select className="w-full bg-gray-500 text-white p-2 rounded">
              <option value="income">Income</option>
              <option value="expense">Expense</option>
              <option value="transfer">Transfer</option>
            </select>
            <select className="w-full bg-gray-500 text-white p-2 rounded">
              <option value="recurring">Recurring</option>
              <option value="one-time">One-time</option>
              <option value="scheduled">Scheduled</option>
            </select>
          </div>
          <div className="flex justify-evenly space-x-4 p-0 m-0 w-full">
            <select className="w-full bg-gray-500 text-white p-2 rounded">
              <option value="salary">Salary</option>
              <option value="groceries">Groceries</option>
              <option value="utilities">Utilities</option>
            </select>
            <select className="w-full bg-gray-500 text-white p-2 rounded">
              <option value="primary">Primary</option>
              <option value="secondary">Secondary</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        <div className="mt-2 space-y-2">
          <LatestEntry />
          <LatestEntry type="income" />
          <LatestEntry type="expense" />
        </div>
      </div>
    </div>
  );
};

export default DetailView;
