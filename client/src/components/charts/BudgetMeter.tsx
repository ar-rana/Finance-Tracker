import { useMemo, useState } from "react";
import { Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { useSelector } from "react-redux";
import { SpecificBudget } from "../../types/FormsData";

const RADIAN = Math.PI / 180;
const CHART_WIDTH = 360;
const CHART_HEIGHT = 300;
const GENERAL_BUDGET = "__general_budget__";

type Needle = {
  value: number;
  data: { name: string; value: number; fill: string }[];
  cx: number;
  cy: number;
  iR: number;
  oR: number;
  color: string;
  gaugeMax: number;
};

const needle = ({ value, cx, cy, iR, oR, color, gaugeMax }: Omit<Needle, 'data'>) => {
  const total = gaugeMax;
  const ang = 180.0 * (1 - value / total);
  const length = (iR + 2 * oR) / 3;
  const sin = Math.sin(-RADIAN * ang);
  const cos = Math.cos(-RADIAN * ang);
  const r = 5;
  const x0 = cx + 5;
  const y0 = cy + 5;
  const xba = x0 + r * sin;
  const yba = y0 - r * cos;
  const xbb = x0 - r * sin;
  const ybb = y0 + r * cos;
  const xp = x0 + length * cos;
  const yp = y0 + length * sin;

  return {
    x0,
    y0,
    r,
    d: `M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`,
    color,
  };
};

const normalize = (s: string) => String(s || "").trim().toLowerCase();

const isCategoryMatch = (expenseCategory: string, selectedCategory: string): boolean => {
  const exp = normalize(expenseCategory);
  const sel = normalize(selectedCategory);
  if (!sel) return false;
  if (sel === "credit") return exp.includes("credit");
  if (sel === "cash") return exp.includes("cash");
  return exp === sel;
};

const BudgetMeter = ({ isAnimationActive = true }: { isAnimationActive?: boolean }) => {
  const expenses = useSelector((state: any) => state.data.expenses);
  const settings = useSelector((state: any) => state.settings.settings);
  const [budgetType, setBudgetType] = useState<string>(GENERAL_BUDGET);

  const currentMonthName = new Date().toLocaleString("en-US", { month: "long" }).toLowerCase();
  const selectedBudget = useMemo(() => {
    if (budgetType === GENERAL_BUDGET) return Number(settings?.budget) || 0;
    return Number(settings?.specifiedBudgets?.[budgetType]) || 0;
  }, [budgetType, settings?.budget, settings?.specifiedBudgets]);

  const currentMonthExpenses = (expenses || []).filter(
    (exp: any) => exp.month?.toLowerCase() === currentMonthName
  );

  const currentMonthTotal = useMemo(() => {
    if (budgetType === GENERAL_BUDGET) {
      return currentMonthExpenses.reduce((sum: number, exp: any) => sum + (Number(exp.amount) || 0), 0);
    }
    return currentMonthExpenses
      .filter((exp: any) => isCategoryMatch(exp.category, budgetType))
      .reduce((sum: number, exp: any) => sum + (Number(exp.amount) || 0), 0);
  }, [budgetType, currentMonthExpenses]);

  const safeBudget = Math.max(0, selectedBudget);
  const showNoCategoryBudget = budgetType !== GENERAL_BUDGET && safeBudget <= 0;
  const chartData = [
    { name: "In Budget", value: safeBudget * 0.6, fill: "#82ca9d" },
    { name: "Near Budget", value: safeBudget * 0.25, fill: "#2C74B3" },
    { name: "At Limit", value: safeBudget * 0.15, fill: "#F4CE14" },
    { name: "Over Budget", value: safeBudget * 0.05, fill: "#BF092F" },
    { name: "No Hope", value: safeBudget * 0.02, fill: "#000000" },
  ];

  const cx = 180;
  const cy = 150;
  const iR = 60;
  const oR = 110;
  const gaugeMax = chartData.reduce((sum, part) => sum + part.value, 0);
  const needleValue = Math.min(Math.max(currentMonthTotal, 0), gaugeMax);
  const needleShape = needle({ value: needleValue, cx, cy, iR, oR, color: "#000000", gaugeMax });

  return (
    <div className="relative w-full h-full bg-white flex">
      <select
        value={budgetType}
        onChange={(e) => setBudgetType(e.target.value)}
        className="absolute top-2 right-2 z-10 text-xs border border-gray-300 rounded p-1 bg-white text-gray-700 outline-none hover:border-indigo-400 focus:ring-1 focus:ring-indigo-400 cursor-pointer"
      >
        <option value={GENERAL_BUDGET}>General Budget</option>
        {SpecificBudget.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {showNoCategoryBudget ? (
        <div className="w-full h-full flex items-center justify-center text-sm text-gray-500">
          No Budget allocated for this category
        </div>
      ) : (
        <>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart width={CHART_WIDTH} height={CHART_HEIGHT}>
              <Pie
                dataKey="value"
                startAngle={180}
                endAngle={0}
                data={chartData}
                cx={cx}
                cy={cy}
                innerRadius={iR}
                outerRadius={oR}
                fill="#8884d8"
                stroke="none"
                isAnimationActive={isAnimationActive}
              />
              <Legend />
              <Tooltip
                formatter={(value: any, name: any) => {
                  if (name === "No Hope") return ["(┬┬﹏┬┬)", name];
                  const percent = safeBudget > 0 ? ((value / safeBudget) * 100).toFixed(0) : "0";
                  return [`${percent}%`, name];
                }}
                wrapperStyle={{ zIndex: 1000 }}
              />
            </PieChart>
          </ResponsiveContainer>
          
          {/* Needle overlay - rendered on top */}
          <svg
            className="absolute inset-0 pointer-events-none"
            width={CHART_WIDTH}
            height={CHART_HEIGHT}
          >
            <circle cx={needleShape.x0} cy={needleShape.y0} r={needleShape.r} fill={needleShape.color} stroke="none" />
            <path d={needleShape.d} fill={needleShape.color} stroke="none" />
          </svg>
        </>
      )}
    </div>
  );
};

export default BudgetMeter;
