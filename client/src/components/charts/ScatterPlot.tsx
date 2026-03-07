import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from 'recharts';

import { useAppSelector } from '../../hooks/reduxHooks';
import { getInScatterData, getOutScatterData } from '../../redux/selectors';
import ColorToggleBtn from '../helpers/ColorToggleBtn';

const ScatterPlot = () => {
  const inData = useAppSelector(getInScatterData);
  const outData = useAppSelector(getOutScatterData);

  return (
    <ColorToggleBtn inData={inData} outData={outData}>
      {({ data, color, label }) => {
        if (!data || data.length === 0) return <div className="flex justify-center items-center h-full">No Data Available for Scatter</div>;

        return (
          <ResponsiveContainer width="100%" height="100%" className={`bg-white`}>
            <ScatterChart
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
              }}
            >
              <CartesianGrid />
              <XAxis type="category" dataKey="date" name="Date" tick={{ fontSize: 11 }} />
              <YAxis type="number" dataKey="y" name="amount" unit="₹" />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter name={label} data={data} fill={color}>
                <LabelList dataKey="label" position="top" fill="#666" fontSize={12} />
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        );
      }}
    </ColorToggleBtn>
  );
};

export default ScatterPlot;
