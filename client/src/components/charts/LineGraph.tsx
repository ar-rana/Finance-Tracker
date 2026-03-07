import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import { useAppSelector } from '../../hooks/reduxHooks';
import { getLineData } from '../../redux/selectors';

const LineGraph = () => {
  const data = useAppSelector(getLineData);
  if (!data || data.length === 0) return <div>No Data Available for Line Graph</div>;

  return (
    <ResponsiveContainer width="100%" height="100%" className={`bg-white`}>
      <LineChart
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
        <Line name="Expense" type="monotone" dataKey="expense" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line name="Income" type="monotone" dataKey="income" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default LineGraph;