import React from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { MonthlyChart } from '../../types/GraphData';

const data: MonthlyChart[] = [
  {
    month: 'Jan',
    expenditure: 4000,
    income: 2400,
    amount: 2400,
  },
  {
    month: 'Feb',
    expenditure: 3000,
    income: 1398,
    amount: 2210,
  },
  {
    month: 'Mar',
    expenditure: 2000,
    income: 9800,
    amount: 2290,
  },
  {
    month: 'June',
    expenditure: 2780,
    income: 3908,
    amount: 2000,
  },
  {
    month: 'Dec',
    expenditure: 1890,
    income: 4800,
    amount: 2181,
  },
];

const BarGraph:React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height="100%" className={`bg-white`}>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="expenditure" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
        <Bar dataKey="income" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarGraph;
