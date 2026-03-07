import React, { useState, useEffect, useRef } from "react";
import LatestEntry from "./LatestEntry";
import { useAppSelector } from "../../hooks/reduxHooks";
import { getExpenses, getInflows } from "../../redux/selectors";
import { ExpenseCategories, InflowSources } from "../../types/FormsData";

const months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];

const getEntryId = (entry: any): string | undefined => entry?.id || entry?._id;

const getEntryTime = (entry: any): number => {
  if (entry?.createdAt) {
    const ts = Date.parse(entry.createdAt);
    if (!Number.isNaN(ts)) return ts;
  }

  const year = Number(entry?.year) || 0;
  const monthIdx = months.indexOf(String(entry?.month || "").toLowerCase());
  const day = Number(entry?.day) || 0;
  return new Date(year, Math.max(monthIdx, 0), day).getTime();
};

const DropdownCheckbox: React.FC<{
  label: string;
  options: string[];
  selected: string[];
  onChange: (value: string) => void;
  onClear: () => void;
}> = ({ label, options, selected, onChange, onClear }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-gray-500 text-white p-2 rounded text-left flex justify-between items-center text-sm min-h-[40px]"
      >
        <span className="truncate">{selected.length > 0 ? `${label} (${selected.length})` : label}</span>
        <span className="ml-2 flex-shrink-0 text-xs">{isOpen ? '▲' : '▼'}</span>
      </button>
      {isOpen && (
        <div className="absolute z-50 mt-1 w-full bg-gray-700 border border-gray-500 rounded-lg shadow-2xl max-h-64 overflow-y-auto">
          <div className="p-2 border-b border-gray-600 flex justify-between items-center sticky top-0 bg-gray-700">
            <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400">Options</span>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onClear(); }}
              className="text-[10px] uppercase font-bold text-blue-400 hover:text-blue-300"
            >
              Clear
            </button>
          </div>
          <div className="p-1">
            {options.map((option) => (
              <label key={option} className="flex items-center space-x-3 text-white cursor-pointer hover:bg-gray-600 p-2 rounded-md transition-colors">
                <input
                  type="checkbox"
                  checked={selected.includes(option)}
                  onChange={() => onChange(option)}
                  onClick={(e) => e.stopPropagation()}
                  className="w-4 h-4 rounded border-gray-400 text-blue-600 focus:ring-blue-500 bg-gray-500"
                />
                <span className="text-xs font-medium">{option.charAt(0).toUpperCase() + option.slice(1).replace(/_/g, ' ')}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const DetailView: React.FC = () => {
  const expenses = useAppSelector(getExpenses) || [];
  const inflows = useAppSelector(getInflows) || [];

  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedMonths, setSelectedMonths] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [searchText, setSearchText] = useState("");
  const [minAmount, setMinAmount] = useState<string>("");
  const [maxAmount, setMaxAmount] = useState<string>("");

  const handleToggle = (list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>, val: string) => {
    if (list.includes(val)) {
      setList(list.filter(i => i !== val));
    } else {
      setList([...list, val]);
    }
  };

  const matchesSearch = (desc: string) => {
    if (!searchText) return true;
    return desc?.toLowerCase().includes(searchText.toLowerCase());
  };

  const matchesAmount = (amt: number) => {
    const min = minAmount === "" ? -Infinity : Number(minAmount);
    const max = maxAmount === "" ? Infinity : Number(maxAmount);
    return amt >= min && amt <= max;
  };

  const filteredInflows = inflows.filter(inf => {
    const monthMatch = selectedMonths.length === 0 || selectedMonths.includes(inf.month?.toLowerCase());
    const sourceMatch = selectedSources.length === 0 || selectedSources.includes(inf.source);
    const typeMatch = selectedTypes.length === 0 || selectedTypes.includes("income");
    const searchMatch = matchesSearch(inf.description);
    const amountMatch = matchesAmount(Number(inf.amount) || 0);
    return monthMatch && sourceMatch && typeMatch && searchMatch && amountMatch;
  });

  const filteredExpenses = expenses.filter(exp => {
    const monthMatch = selectedMonths.length === 0 || selectedMonths.includes(exp.month?.toLowerCase());
    const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(exp.category);
    const typeMatch = selectedTypes.length === 0 || selectedTypes.includes("expense");
    const searchMatch = matchesSearch(exp.description);
    const amountMatch = matchesAmount(Number(exp.amount) || 0);
    return monthMatch && categoryMatch && typeMatch && searchMatch && amountMatch;
  });

  const allEntries = [
    ...filteredInflows.map(i => ({ ...i, entryType: 'income' as const })),
    ...filteredExpenses.map(e => ({ ...e, entryType: 'expense' as const }))
  ].sort((a, b) => getEntryTime(b) - getEntryTime(a));

  const totalInflow = filteredInflows.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);
  const totalOutflow = filteredExpenses.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);

  return (
    <div className="w-full p-4 bg-gray-700">
      <div className="p-4 bg-gray-600 space-y-4 rounded-2xl">
        <div className="flex justify-between items-center flex-col sm:flex-row gap-4">
          <h2 className="text-white text-md font-medium items-center">Detailed View</h2>
          <div className="flex gap-4 text-md font-bold bg-white p-2 rounded-lg">
            <h2 className="text-green-600 bg-green-50 p-2 rounded-lg">Total Inflow: ₹{totalInflow.toLocaleString()}</h2>
            <h2 className="text-red-600 bg-red-50 p-2 rounded-lg">Total Outflow: ₹{totalOutflow.toLocaleString()}</h2>
          </div>
        </div>

        <div className="space-y-3">
          {/* Row 1: Search and Amount Range */}
          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="text"
              placeholder="Search descriptions..."
              className="flex-1 bg-gray-500 text-white p-2 rounded text-sm px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-300"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="number"
                placeholder="Min ₹"
                className="w-full md:w-28 bg-gray-500 text-white p-2 rounded text-sm px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-300"
                value={minAmount}
                onChange={(e) => setMinAmount(e.target.value)}
              />
              <input
                type="number"
                placeholder="Max ₹"
                className="w-full md:w-28 bg-gray-500 text-white p-2 rounded text-sm px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-300"
                value={maxAmount}
                onChange={(e) => setMaxAmount(e.target.value)}
              />
            </div>
          </div>

          {/* Row 2: Category Switches */}
          <div className="flex flex-col md:flex-row justify-evenly gap-3 p-0 m-0">
            <div className="flex justify-evenly space-x-3 p-0 m-0 w-full">
              <DropdownCheckbox
                label="Entry Type"
                options={["income", "expense"]}
                selected={selectedTypes}
                onChange={(val) => handleToggle(selectedTypes, setSelectedTypes, val)}
                onClear={() => setSelectedTypes([])}
              />
              <DropdownCheckbox
                label="Months"
                options={months}
                selected={selectedMonths}
                onChange={(val) => handleToggle(selectedMonths, setSelectedMonths, val)}
                onClear={() => setSelectedMonths([])}
              />
            </div>
            <div className="flex justify-evenly space-x-3 p-0 m-0 w-full">
              <DropdownCheckbox
                label="Expense Cat"
                options={[...ExpenseCategories]}
                selected={selectedCategories}
                onChange={(val) => handleToggle(selectedCategories, setSelectedCategories, val)}
                onClear={() => setSelectedCategories([])}
              />
              <DropdownCheckbox
                label="Inflow Src"
                options={[...InflowSources]}
                selected={selectedSources}
                onChange={(val) => handleToggle(selectedSources, setSelectedSources, val)}
                onClear={() => setSelectedSources([])}
              />
            </div>
          </div>
        </div>

        <div className="mt-2 space-y-2">
          {allEntries.length === 0 ? (
            <div className="text-gray-400 text-center py-8 bg-gray-700 rounded-xl border-2 border-dashed border-gray-500">
              No matches found for the selected filters.
            </div>
          ) : (
            allEntries.map((entry: any) => (
              <LatestEntry
                key={getEntryId(entry) || `${entry.entryType}-${entry.month}-${entry.year}-${entry.day}-${entry.amount}-${entry.description}`}
                id={getEntryId(entry)}
                type={entry.entryType}
                title={entry.entryType === 'income' ? (entry.source || 'Inflow') : (entry.category || 'Expense')}
                amount={`₹${(Number(entry.amount) || 0).toLocaleString()}`}
                date={`${entry.month} ${entry.year}`}
                day={entry.day}
                description={entry.description || ''}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailView;
