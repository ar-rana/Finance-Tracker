import React, { useState } from "react";
import LatestEntry from "./LatestEntry";

const DetailView: React.FC = () => {
  const [entry, setEntry] = useState<any[]>([]);
  const [filter, setFilter] = useState<any>();
  return (
    <div className="w-full p-4 bg-gray-700">
      <div className="p-4 bg-gray-600 space-y-4 rounded-2xl">
        <h2 className="text-white text-md font-medium">Detailed View</h2>
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
          <LatestEntry type="income"/>
          <LatestEntry type="expense"/>
        </div>
      </div>
    </div>
  );
};

export default DetailView;
