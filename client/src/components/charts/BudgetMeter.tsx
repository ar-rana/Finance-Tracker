import { Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const RADIAN = Math.PI / 180;
const chartData = [
  { name: "In_budget", value: 80, fill: "#82ca9d" },
  { name: "Near_budget", value: 20, fill: "#2C74B3" },
  { name: "Crossed_budget", value: 25, fill: "#F4CE14" },
  { name: "Far_from_budget", value: 25, fill: "#BF092F" },
  { name: "No_hope", value: 2, fill: "#000000" },
];

type Needle = {
  value: number;
  data: { name: string; value: number; fill: string }[];
  cx: number;
  cy: number;
  iR: number;
  oR: number;
  color: string;
};

const needle = ({ value, data, cx, cy, iR, oR, color }: Needle) => {
  const total = data.reduce((sum, entry) => sum + entry.value, 0);
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
  const cx = 180;
  const cy = 150;
  const iR = 60;
  const oR = 110;
  const value = 50;

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
        {needle({ value, data: chartData, cx, cy, iR, oR, color: "#000000" })}
        <Legend />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default BudgetMeter;
