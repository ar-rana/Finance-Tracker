import { Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'; //Cell, Legend

const data01 = [
  { name: 'Group A', value: 4000 },
  { name: 'Group B', value: 3000 },
  { name: 'Group C', value: 3000 },
  { name: 'Group D', value: 2000 },
  { name: 'Group E', value: 2708 },
  { name: 'Group F', value: 1890 },
];

const PieGraph = () => {
  return (
    <ResponsiveContainer width="100%" height="100%" className={`bg-white`}>
      <PieChart width={400} height={400}>
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={data01}
          cx="73%"
          cy="50%"
          outerRadius={55}
          fill="#82ca9d"
          // label={{ position: 'inside' }}
          label
        />
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={data01}
          cx="27%"
          cy="50%"
          outerRadius={55}
          fill="#8884d8"
          label
        />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default PieGraph;
