import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import { useAppSelector } from '../../hooks/reduxHooks';
import { getCategoryBarData } from '../../redux/selectors';
import { INCOME_COLOR, EXPENSE_COLOR } from '../helpers/ColorToggleBtn';

const monthOrder = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];

const BarGraph: React.FC = () => {
  const rawData = useAppSelector(getCategoryBarData);

  if (!rawData || rawData.length === 0) return <div className="flex justify-center items-center h-full">No Data Available for Bar Graph</div>;

  // Sort data by month order and add a uniqueKey to avoid Recharts hover overlap
  const data = [...rawData].sort((a, b) => {
    return monthOrder.indexOf(a.month.toLowerCase()) - monthOrder.indexOf(b.month.toLowerCase());
  }).map(item => ({ ...item, uniqueKey: `${item.month}-${item.name}` }));

  return (
    <ResponsiveContainer width="100%" height="100%" className={`bg-white`}>
      <BarChart
        data={data}
        margin={{
          top: 10,
          right: 10,
          left: -20,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />

        {/* Primary XAxis for Category Names - Truncated */}
        <XAxis
          dataKey="uniqueKey"
          xAxisId={0}
          tick={{ fontSize: 9 }}
          interval={0}
          tickFormatter={(val) => {
            const name = val.split('-').slice(1).join('-');
            return name.length > 4 ? name.substring(0, 4) : name;
          }}
        />

        {/* Secondary XAxis for Months */}
        <XAxis
          dataKey="month"
          xAxisId={1}
          axisLine={false}
          tickLine={false}
          interval={0}
          tick={({ x, y, payload }: any) => {
            const index = payload.index;
            if (index > 0 && data[index].month === data[index - 1].month) {
              return <></>;
            }
            return (
              <text x={x} y={y} fill="#444" textAnchor="middle" fontWeight="bold" fontSize={11}>
                {payload.value.charAt(0).toUpperCase() + payload.value.slice(1)}
              </text>
            );
          }}
        />

        <YAxis
          tick={{ fontSize: 10 }}
          width={60}
          tickFormatter={(val) => val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}
        />
        <Tooltip
          formatter={(val: any) => `₹${Number(val).toLocaleString()}`}
          labelFormatter={(label, payload) => {
            if (payload && payload[0]) {
              const item = payload[0].payload;
              return `${item.month.charAt(0).toUpperCase() + item.month.slice(1)} - ${item.name}`;
            }
            return label;
          }}
        />
        <Legend verticalAlign="top" height={30} iconSize={12} wrapperStyle={{ fontSize: '12px' }} />
        <Bar name="Expense" dataKey="expense" stackId="a" fill={EXPENSE_COLOR} />
        <Bar name="Income" dataKey="income" stackId="a" fill={INCOME_COLOR} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarGraph;
