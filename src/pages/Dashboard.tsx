import React, { useEffect, useState } from 'react';
import { fetchStockData } from '../api/finnhubClient';

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
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStockData = async () => {
      try {
        setLoading(true);
        const data = await fetchStockData('AAPL'); // Fetch Apple stock data
        setStockData(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch stock data');
        setLoading(false);
      }
    };

    loadStockData();
  }, []);

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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stock Data Cards */}
        <StockCard title="Current Price" value={`$${stockData?.c}`} />
        <StockCard title="Change" value={`$${stockData?.d}`} />
        <StockCard title="Percent Change" value={`${stockData?.dp}%`} />
        <StockCard title="High Price" value={`$${stockData?.h}`} />
        <StockCard title="Low Price" value={`$${stockData?.l}`} />
        <StockCard title="Previous Close" value={`$${stockData?.pc}`} />
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
