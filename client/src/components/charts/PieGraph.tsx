import { useState, useMemo, useEffect } from 'react';
import { Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { useAppSelector } from '../../hooks/reduxHooks';
import { getExpenses, getInflows, getAllSettingData } from '../../redux/selectors';
import { INCOME_COLOR, EXPENSE_COLOR } from '../helpers/ColorToggleBtn';
import { parsePieData, parseIncomePieData, getMonthsInRange } from '../../utils/chartParsers';
import { fmtVal } from '../../utils/formatters';


// Label shows ONLY the formatted number, no category name
const renderLabel = ({ cx, cy, midAngle, outerRadius, value }: any) => {
  const RADIAN = Math.PI / 180;
  const r = outerRadius + 4;
  const x = cx + r * Math.cos(-midAngle * RADIAN);
  const y = cy + r * Math.sin(-midAngle * RADIAN);
  return (
    <text
      x={x}
      y={y}
      fill="#555"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      fontSize={11}
    >
      {fmtVal(value)}
    </text>
  );
};

const SinglePie = ({ data, color }: { data: any[]; color: string }) => (
  <ResponsiveContainer width="100%" height="100%">
    <PieChart margin={{ top: 20, right: 25, bottom: 20, left: 25 }}>
      <Pie
        dataKey="value"
        isAnimationActive={false}
        data={data}
        cx="50%"
        cy="50%"
        outerRadius={52}
        fill={color}
        label={renderLabel}
        labelLine={false}
      />
      <Tooltip
        formatter={(val: any, name: any) => [`₹${fmtVal(Number(val))}`, name]}
      />
    </PieChart>
  </ResponsiveContainer>
);

const PieGraph = () => {
  const expenses = useAppSelector(getExpenses);
  const inflows = useAppSelector(getInflows);
  const settings = useAppSelector(getAllSettingData);

  const monthOptions = useMemo(() => getMonthsInRange(settings.start, settings.end), [settings.start, settings.end]);

  const defaultOption = useMemo(() => {
    const monthNames = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
    const currentMonth = monthNames[new Date().getMonth()];
    const currentYear = String(new Date().getFullYear());
    const found = monthOptions.find((o: any) => o.monthValue === currentMonth && o.yearValue === currentYear);
    return found || monthOptions[0];
  }, [monthOptions]);

  const [selectedOption, setSelectedOption] = useState(defaultOption);

  useEffect(() => {
    if (!selectedOption || !monthOptions.find((o: any) => o.label === selectedOption.label)) {
      setSelectedOption(defaultOption);
    }
  }, [monthOptions, defaultOption, selectedOption]);

  const filteredExpenses = useMemo(() =>
    expenses?.filter(e => e.month?.toLowerCase() === selectedOption?.monthValue && e.year === selectedOption?.yearValue) || [],
    [expenses, selectedOption]);

  const filteredInflows = useMemo(() =>
    inflows?.filter(i => i.month?.toLowerCase() === selectedOption?.monthValue && i.year === selectedOption?.yearValue) || [],
    [inflows, selectedOption]);

  const expenseData = useMemo(() => parsePieData(filteredExpenses), [filteredExpenses]);
  const incomeData = useMemo(() => parseIncomePieData(filteredInflows), [filteredInflows]);

  const noExpense = !expenseData || expenseData.length === 0;
  const noIncome = !incomeData || incomeData.length === 0;

  return (
    <div className="relative flex flex-col w-full h-full bg-white p-2">
      {monthOptions.length > 0 && (
        <select
          value={selectedOption?.label || ''}
          onChange={e => setSelectedOption(monthOptions.find((o: any) => o.label === e.target.value)!)}
          className="absolute top-2 left-2 z-10 text-xs border border-gray-300 rounded p-1 bg-white text-gray-700 outline-none hover:border-indigo-400 focus:ring-1 focus:ring-indigo-400 cursor-pointer"
        >
          {monthOptions.map((o: any) => (
            <option key={o.label} value={o.label}>{o.label}</option>
          ))}
        </select>
      )}

      {(noExpense && noIncome) ? (
        <div className="flex-1 flex items-center justify-center text-sm text-gray-400 w-full h-full pt-6 border-transparent bg-transparent">
          No Data Available
        </div>
      ) : (
        <div className="flex flex-1 w-full min-h-0 pt-6 gap-1 bg-transparent border-transparent">
          <div className="flex-1 h-full min-w-0 bg-transparent border-transparent">
            {noIncome
              ? <div className="flex items-center justify-center h-full text-xs text-gray-400 bg-transparent border-transparent">No Income</div>
              : <SinglePie data={incomeData} color={INCOME_COLOR} />
            }
          </div>
          <div className="flex-1 h-full min-w-0 bg-transparent border-transparent">
            {noExpense
              ? <div className="flex items-center justify-center h-full text-xs text-gray-400 bg-transparent border-transparent">No Expense</div>
              : <SinglePie data={expenseData} color={EXPENSE_COLOR} />
            }
          </div>
        </div>
      )}
    </div>
  );
};

export default PieGraph;
