import { Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { useAppSelector } from '../../hooks/reduxHooks';
import { getExpensePieData, getIncomePieData } from '../../redux/selectors';
import { INCOME_COLOR, EXPENSE_COLOR } from '../helpers/ColorToggleBtn';

// Compact Indian-style: 100 → "100", 10000 → "10k", 150000 → "1.5L"
const fmtVal = (val: number): string => {
  if (val >= 100000) return `${(val / 100000).toFixed(1)}L`;
  if (val >= 1000) return `${(val / 1000).toFixed(1)}k`;
  return String(val);
};

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
        outerRadius={55}
        fill={color}
        label={renderLabel}
        labelLine={false}
      />
      <Tooltip
        formatter={(val: number, name: string) => [`₹${Number(val).toLocaleString()}`, name]}
      />
    </PieChart>
  </ResponsiveContainer>
);

const PieGraph = () => {
  const expenseData = useAppSelector(getExpensePieData);
  const incomeData = useAppSelector(getIncomePieData);

  const noExpense = !expenseData || expenseData.length === 0;
  const noIncome = !incomeData || incomeData.length === 0;

  if (noExpense && noIncome) {
    return (
      <div className="flex items-center justify-center h-full text-sm text-gray-400">
        No Data Available
      </div>
    );
  }

  return (
    <div className="flex w-full h-full bg-white">
      {/* Left — Income by Source (green) */}
      <div className="flex-1 h-full min-w-0">
        {noIncome
          ? <div className="flex items-center justify-center h-full text-xs text-gray-400">No Income</div>
          : <SinglePie data={incomeData} color={INCOME_COLOR} />
        }
      </div>

      {/* Right — Expense by Category (purple) */}
      <div className="flex-1 h-full min-w-0">
        {noExpense
          ? <div className="flex items-center justify-center h-full text-xs text-gray-400">No Expense</div>
          : <SinglePie data={expenseData} color={EXPENSE_COLOR} />
        }
      </div>
    </div>
  );
};

export default PieGraph;
