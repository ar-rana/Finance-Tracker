import { Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

import { useAppSelector } from '../../hooks/reduxHooks';
import { getRadarData } from '../../redux/selectors';
import { INCOME_COLOR, EXPENSE_COLOR } from '../helpers/ColorToggleBtn';

const RadarGraph = () => {
  const data = useAppSelector(getRadarData);
  if (!data || data.length === 0) return <div>No Data Available for Radar</div>;

  return (
    <ResponsiveContainer width="100%" height="100%" className={`bg-white`}>
      <RadarChart cx="50%" cy="45%" outerRadius="70%" data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" tick={{ fontSize: 14 }} />
        <PolarRadiusAxis
          angle={30}
          tick={{ fontSize: 13, fill: "#555" }}
          tickFormatter={(val) => {
            if (val >= 100000) return `${(val / 100000).toFixed(1)}L`;
            if (val >= 1000) return `${(val / 1000).toFixed(1)}k`;
            return val;
          }}
        />
        <Radar name="Expense" dataKey="expense" stroke={EXPENSE_COLOR} fill={EXPENSE_COLOR} fillOpacity={0.8} />
        <Radar name="Income" dataKey="income" stroke={INCOME_COLOR} fill={INCOME_COLOR} fillOpacity={0.5} />
        <Legend />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default RadarGraph;
