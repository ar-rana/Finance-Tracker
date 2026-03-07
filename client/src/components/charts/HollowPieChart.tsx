import { useState, useMemo, useEffect } from 'react';
import { Pie, PieChart, ResponsiveContainer, Sector } from 'recharts';

import ColorToggleBtn from '../helpers/ColorToggleBtn';
import { useAppSelector } from '../../hooks/reduxHooks';
import { getExpenses, getInflows, getAllSettingData } from '../../redux/selectors';
import { parseHollowPieData, parseOutflowHollowPieData, getMonthsInRange } from '../../utils/chartParsers';
import { fmtVal } from '../../utils/formatters';



const renderActiveShape = (props: any) => {
  const {
    cx, cy, midAngle, innerRadius, outerRadius,
    startAngle, endAngle,
    fill,
    payload, percent, value,
  } = props;
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
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`₹ ${fmtVal(value)}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={17} textAnchor={textAnchor} fill="#999">
        {`(${((percent ?? 1) * 100).toFixed(1)}%)`}
      </text>
    </g>
  );
};

const HollowPieChart = () => {
  const expenses = useAppSelector(getExpenses);
  const inflows = useAppSelector(getInflows);
  const settings = useAppSelector(getAllSettingData);

  const monthOptions = useMemo(() => getMonthsInRange(settings.start, settings.end), [settings.start, settings.end]);

  const defaultOption = useMemo(() => {
    const monthNames = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
    const currentMonth = monthNames[new Date().getMonth()];
    const currentYear = String(new Date().getFullYear());
    const found = monthOptions.find((o: any) => o.monthValue === currentMonth && o.yearValue === currentYear);
    return found || monthOptions[0];
  }, [monthOptions]);

  const [selectedOption, setSelectedOption] = useState(defaultOption);

  useEffect(() => {
    if (!selectedOption || !monthOptions.find((o: any) => o.label === selectedOption.label)) {
      setSelectedOption(defaultOption);
    }
  }, [monthOptions, defaultOption, selectedOption]);

  const filteredExpenses = useMemo(() =>
    expenses?.filter(e => e.month?.toLowerCase() === selectedOption?.monthValue && e.year === selectedOption?.yearValue) || [],
    [expenses, selectedOption]);

  const filteredInflows = useMemo(() =>
    inflows?.filter(i => i.month?.toLowerCase() === selectedOption?.monthValue && i.year === selectedOption?.yearValue) || [],
    [inflows, selectedOption]);

  const expenseData = useMemo(() => parseOutflowHollowPieData(filteredExpenses), [filteredExpenses]);
  const incomeData = useMemo(() => parseHollowPieData(filteredInflows), [filteredInflows]);

  return (
    <div className="relative w-full h-full bg-white p-2">
      {monthOptions.length > 0 && (
        <select
          value={selectedOption?.label || ''}
          onChange={e => setSelectedOption(monthOptions.find((o: any) => o.label === e.target.value)!)}
          className="absolute top-3 left-2 z-10 text-xs border border-gray-300 rounded p-1 bg-white text-gray-700 outline-none hover:border-indigo-400 focus:ring-1 focus:ring-indigo-400 cursor-pointer"
        >
          {monthOptions.map((o: any) => (
            <option key={o.label} value={o.label}>{o.label}</option>
          ))}
        </select>
      )}

      <div className="w-full h-full pt-6">
        <ColorToggleBtn inData={incomeData} outData={expenseData}>
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
      </div>
    </div>
  );
};

export default HollowPieChart;