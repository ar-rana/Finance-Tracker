import { Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

const data = [
  {
    subject: 'Math',
    A: 120,
    B: 110,
    fullMark: 150,
  },
  {
    subject: 'Chinese',
    A: 98,
    B: 130,
    fullMark: 150,
  },
  {
    subject: 'English',
    A: 86,
    B: 130,
    fullMark: 150,
  },
  {
    subject: 'Geography',
    A: 99,
    B: 100,
    fullMark: 150,
  },
  {
    subject: 'Physics',
    A: 85,
    B: 90,
    fullMark: 150,
  },
  {
    subject: 'History',
    A: 65,
    B: 85,
    fullMark: 150,
  },
  {
    subject: 'seventh',
    A: 0,
    B: 85,
    fullMark: 150,
  },
];

const RadarGraph = () => {
  return (
      <ResponsiveContainer width="100%" height="100%" className={`bg-white`}>
        <RadarChart cx="50%" cy="45%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis angle={30} domain={[0, 150]} />
          <Radar name="Expense-/" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.8} />
          <Radar name="/-Income" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.5} />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    );
};

export default RadarGraph;
