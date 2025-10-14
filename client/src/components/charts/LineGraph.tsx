import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    month: 'Winner',
    expenditure: 4000,
    income: 2400,
    amt: 2400,
  },
  {
    month: 'February',
    expenditure: 3000,
    income: 1398,
    amt: 2210,
  },
  {
    month: 'March',
    expenditure: 2000,
    income: 9800,
    amt: 2290,
  },
  {
    month: 'June',
    expenditure: 2780,
    income: 3908,
    amt: 2000,
  },
  {
    month: 'Dec',
    expenditure: 1890,
    income: 4800,
    amt: 2181,
  },
  {
    month: 'April',
    expenditure: 4000,
    income: 2400,
    amt: 2400,
  },
  {
    month: 'May',
    expenditure: 3000,
    income: 1398,
    amt: 2210,
  },
  {
    month: 'July',
    expenditure: 2000,
    income: 9800,
    amt: 2290,
  },
  {
    month: 'August',
    expenditure: 2780,
    income: 3908,
    amt: 2000,
  },
  {
    month: 'September',
    expenditure: 1890,
    income: 4800,
    amt: 2181,
  },
  {
    month: 'November',
    expenditure: 2780,
    income: 3908,
    amt: 2000,
  },
  {
    month: 'January',
    expenditure: 1890,
    income: 4800,
    amt: 2181,
  },
  {
    month: 'Thirteen',
    expenditure: 2780,
    income: 3908,
    amt: 2000,
  },
  {
    month: 'Fourteen',
    expenditure: 1890,
    income: 4800,
    amt: 2181,
  },
];

const LineGraph = () => {
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
        <Line type="monotone" dataKey="expenditure" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="income" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default LineGraph;