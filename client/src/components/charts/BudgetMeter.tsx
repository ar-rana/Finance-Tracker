import { Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { useSelector } from "react-redux";

const RADIAN = Math.PI / 180;
const CHART_WIDTH = 360;
const CHART_HEIGHT = 300;

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
  const x0 = cx;
  const y0 = cy;
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
    { name: "Near Budget", value: budget * 0.25, fill: "#2C74B3" }, // (60–80%)
    { name: "At Limit", value: budget * 0.15, fill: "#F4CE14" }, // (80–100%)
    { name: "Over Budget", value: budget * 0.05, fill: "#BF092F" }, // (100%+)
    { name: "No Hope", value: budget * 0.02, fill: "#000000" }, // (100%+)
  ];

  const cx = 180;
  const cy = 150;
  const iR = 60;
  const oR = 110;
  const gaugeMax = chartData.reduce((sum, part) => sum + part.value, 0);
  const needleValue = Math.min(currentMonthTotal, gaugeMax);
  const needleShape = needle({ value: needleValue, cx, cy, iR, oR, color: "#000000", gaugeMax });

  return (
    <div className="relative w-full h-full bg-white">
      <ResponsiveContainer width="100%" height="100%" className={`bg-white flex`}>
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
              const percent = ((value / budget) * 100).toFixed(0);
              return [`${percent}%`, name];
            }}
            wrapperStyle={{ zIndex: 50 }}
          />
        </PieChart>
      </ResponsiveContainer>

      <svg
        className="absolute inset-0 z-10 pointer-events-none"
        viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
        preserveAspectRatio="xMidYMid meet"
      >
        <circle cx={needleShape.x0} cy={needleShape.y0} r={needleShape.r} fill={needleShape.color} stroke="none" />
        <path d={needleShape.d} fill={needleShape.color} stroke="none" />
      </svg>
    </div>
  );
}

export default BudgetMeter;
