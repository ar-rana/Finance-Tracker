import { Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { useSelector } from "react-redux";

const RADIAN = Math.PI / 180;

type Needle = {
  value: number;
  data: { name: string; value: number; fill: string }[];
  cx: number;
  cy: number;
  iR: number;
  oR: number;
  color: string;
  gaugeMax: number; // Added gaugeMax to Needle type
};

const needle = ({ value, cx, cy, iR, oR, color, gaugeMax }: Omit<Needle, 'data'>) => {
  // Use gaugeMax for the total range of the gauge
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

  return [
    <circle
      key="needle-circle"
      cx={x0}
      cy={y0}
      r={r}
      fill={color}
      stroke="none"
    />,
    <path
      key="needle-path"
      d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`}
      stroke="#none"
      fill={color}
    />,
  ];
};

const BudgetMeter = ({ isAnimationActive = true }: { isAnimationActive?: boolean }) => {
  const expenses = useSelector((state: any) => state.data.expenses);
  const settings = useSelector((state: any) => state.settings.settings);

  // Get current month name in lowercase (e.g. "february")
  const currentMonthName = new Date().toLocaleString("en-US", { month: "long" }).toLowerCase();

  // Sum expenses for the current month only by matching month name string
  const currentMonthTotal = (expenses || [])
    .filter((exp: any) => exp.month?.toLowerCase() === currentMonthName)
    .reduce((sum: number, exp: any) => sum + (Number(exp.amount) || 0), 0);

  const budget = Number(settings?.budget) || 10000;

  // Gauge segments scaled to budget — always total = budget
  const chartData = [
    { name: "In Budget", value: budget * 0.60, fill: "#82ca9d" }, // (0–60%)
    { name: "Near Budget", value: budget * 0.20, fill: "#2C74B3" }, // (60–80%)
    { name: "At Limit", value: budget * 0.15, fill: "#F4CE14" }, // (80–100%)
    { name: "Over Budget", value: budget * 0.05, fill: "#BF092F" }, // (100%+)
    { name: "No Hope", value: budget * 0.02, fill: "#000000" }, // (100%+)
  ];

  const cx = 180;
  const cy = 150;
  const iR = 60;
  const oR = 110;
  const needleValue = Math.min(currentMonthTotal, budget);
  const gaugeMax = budget;

  return (
    <ResponsiveContainer width="100%" height="100%" className={`bg-white flex`}>
      <PieChart width={100} height={100}>
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
        {needle({ value: needleValue, cx, cy, iR, oR, color: "#000000", gaugeMax })}
        <Legend />
        <Tooltip
          formatter={(value: any, name: any) => {
            if (name === "No Hope") return ["(┬┬﹏┬┬)", name];
            const percent = ((value / budget) * 100).toFixed(0);
            return [`${percent}%`, name];
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default BudgetMeter;
