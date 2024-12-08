import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip);

type LineChartProps = {
  data: { dates: string[]; values: number[] };
};

const LineChart: React.FC<LineChartProps> = ({ data }) => {
  const chartData = {
    labels: data.dates,
    datasets: [
      {
        label: 'Stock Prices',
        data: data.values,
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-lg font-bold mb-4">Stock Prices</h2>
      <Line data={chartData} />
    </div>
  );
};

export default LineChart;
