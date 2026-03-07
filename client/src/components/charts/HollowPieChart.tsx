import React from 'react';
import { Pie, PieChart, ResponsiveContainer, Sector } from 'recharts';
import type { SectorProps } from 'recharts';
import ColorToggleBtn from '../helpers/ColorToggleBtn';

type Coordinate = {
  x: number;
  y: number;
};

type PieSectorData = {
  percent?: number;
  type?: string | number;
  midAngle?: number;
  middleRadius?: number;
  tooltipPosition?: Coordinate;
  value?: number;
  paddingAngle?: number;
  dataKey?: string;
  payload?: any;
};

type PieSectorDataItem = React.SVGProps<SVGPathElement> & Partial<SectorProps> & PieSectorData;


const renderActiveShape = ({
  cx, cy, midAngle, innerRadius, outerRadius,
  startAngle, endAngle,
  fill,
  payload, percent, value,
}: PieSectorDataItem) => {
  const RADIAN = Math.PI / 180;
  const sin = Math.sin(-RADIAN * (midAngle ?? 1));
  const cos = Math.cos(-RADIAN * (midAngle ?? 1));
  const sx = (cx ?? 0) + ((outerRadius ?? 0) + 10) * cos;
  const sy = (cy ?? 0) + ((outerRadius ?? 0) + 10) * sin;
  const mx = (cx ?? 0) + ((outerRadius ?? 0) + 25) * cos;
  const my = (cy ?? 0) + ((outerRadius ?? 0) + 25) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 10;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload?.type}
      </text>
      <Sector cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius} startAngle={startAngle} endAngle={endAngle} fill={fill} />
      <Sector cx={cx} cy={cy} startAngle={startAngle} endAngle={endAngle} innerRadius={(outerRadius ?? 0) + 6} outerRadius={(outerRadius ?? 0) + 10} fill={fill} />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`₹ ${value}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={17} textAnchor={textAnchor} fill="#999">
        {`(${((percent ?? 1) * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

const HollowPieChart = () => (
  <ColorToggleBtn>
    {({ data, color, label }) => {
      if (!data || data.length === 0) {
        return (
          <div className="flex items-center justify-center h-full text-sm text-gray-400">
            No {label} Data Available
          </div>
        );
      }
      return (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={400} height={400}>
            <Pie
              activeShape={renderActiveShape}
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill={color}
              dataKey="value"
            />
          </PieChart>
        </ResponsiveContainer>
      );
    }}
  </ColorToggleBtn>
);

export default HollowPieChart;