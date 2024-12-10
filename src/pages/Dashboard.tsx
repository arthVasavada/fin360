import React, { useEffect, useState } from 'react';
import {
  fetchRealTimeStockData,
  fetchHistoricalStockData,
} from '../api/alphaVantageClient';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const availableStocks = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA'];

type StockData = {
  c: number; // Current price
  d: number; // Change
  dp: number; // Percent change
  h: number; // High price of the day
  l: number; // Low price of the day
  o: number; // Open price of the day
  pc: number; // Previous close price
};

export default function Dashboard(): JSX.Element {
  const [selectedStock, setSelectedStock] = useState<string>('AAPL');
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        // Fetch real-time stock data
        const realtimeData = await fetchRealTimeStockData(selectedStock);
        setStockData(realtimeData);

        // Fetch historical stock data
        const historicalData = await fetchHistoricalStockData(selectedStock);
        setChartData(historicalData);

        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    loadData();
  }, [selectedStock]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500">Loading stock data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

      {/* Dropdown for Stock Selection */}
      <div className="mb-6">
        <label htmlFor="stockSelect" className="text-lg font-bold text-gray-700">Select Stock:</label>
        <select
          id="stockSelect"
          className="ml-4 p-2 border border-gray-300 rounded"
          value={selectedStock}
          onChange={(e) => setSelectedStock(e.target.value)}
        >
          {availableStocks.map((symbol) => (
            <option key={symbol} value={symbol}>
              {symbol}
            </option>
          ))}
        </select>
      </div>

      {/* Stock Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StockCard title="Current Price" value={`$${stockData?.c}`} />
        <StockCard title="Change" value={`$${stockData?.d}`} />
        <StockCard title="Percent Change" value={`${stockData?.dp}%`} />
        <StockCard title="High Price" value={`$${stockData?.h}`} />
        <StockCard title="Low Price" value={`$${stockData?.l}`} />
        <StockCard title="Previous Close" value={`$${stockData?.pc}`} />
      </div>

      {/* Historical Data Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-lg font-bold mb-4">Historical Data</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="close" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

type StockCardProps = {
  title: string;
  value: string | undefined;
};

function StockCard({ title, value }: StockCardProps): JSX.Element {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-bold text-gray-700">{title}</h2>
      <p className="text-2xl text-blue-500">{value}</p>
    </div>
  );
}
