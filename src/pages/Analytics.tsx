import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import {
  fetchHistoricalStockData,
  fetchStockOverview,
} from '../api/alphaVantageClient';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

// Define the options for stock selection
const stockOptions = [
  { value: 'AAPL', label: 'Apple (AAPL)' },
  { value: 'MSFT', label: 'Microsoft (MSFT)' },
  { value: 'GOOGL', label: 'Google (GOOGL)' },
  { value: 'AMZN', label: 'Amazon (AMZN)' },
  { value: 'TSLA', label: 'Tesla (TSLA)' },
];

type StockOverview = {
  Name: string;
  Symbol: string;
  MarketCapitalization: string;
  PERatio: string;
  DividendYield: string;
  Sector: string;
};

export default function Analytics(): JSX.Element {
  const [selectedStocks, setSelectedStocks] = useState<string[]>(['AAPL', 'MSFT']);
  const [chartData, setChartData] = useState<any[]>([]);
  const [stockOverviews, setStockOverviews] = useState<StockOverview[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Load analytics data whenever selected stocks change
  useEffect(() => {
    const loadAnalyticsData = async () => {
      try {
        setLoading(true);

        // Fetch historical data for selected stocks
        const historicalDataPromises = selectedStocks.map((symbol) =>
          fetchHistoricalStockData(symbol)
        );
        const historicalDataResults = await Promise.all(historicalDataPromises);

        // Merge data for chart
        const dateMap: Record<string, any> = {};
        selectedStocks.forEach((symbol, idx) => {
          historicalDataResults[idx]?.forEach((entry: any) => {
            const { date, close } = entry;
            if (!dateMap[date]) {
              dateMap[date] = { date };
            }
            dateMap[date][symbol] = close || null;
          });
        });
        setChartData(Object.values(dateMap));

        // Fetch stock overviews
        const overviewPromises = selectedStocks.map((symbol) =>
          fetchStockOverview(symbol)
        );
        const overviews = await Promise.all(overviewPromises);
        setStockOverviews(overviews);

        setLoading(false);
      } catch (err) {
        setError('Failed to fetch analytics data');
        setLoading(false);
      }
    };

    loadAnalyticsData();
  }, [selectedStocks]);

  const handleSelectChange = (selectedOptions: any) => {
    const selectedSymbols = selectedOptions.map((option: any) => option.value);
    setSelectedStocks(selectedSymbols);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500">Loading analytics data...</div>
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
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Analytics</h1>

      {/* Multi-Select Dropdown */}
      <div className="mb-6">
        <label htmlFor="stockSelect" className="text-lg font-bold text-gray-700">
          Select Stocks:
        </label>
        <Select
          isMulti
          options={stockOptions}
          defaultValue={stockOptions.filter((option) => selectedStocks.includes(option.value))}
          onChange={handleSelectChange}
        />
      </div>

      {/* Performance Comparison Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-bold mb-4">Performance Comparison</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            {selectedStocks.map((symbol) => (
              <Line
                key={symbol}
                type="monotone"
                dataKey={symbol}
                stroke="#8884d8"
                strokeWidth={2}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Stock Overview Table */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-bold mb-4">Stock Overview</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Symbol</th>
              <th className="border border-gray-300 p-2">Market Cap</th>
              <th className="border border-gray-300 p-2">P/E Ratio</th>
              <th className="border border-gray-300 p-2">Dividend Yield</th>
              <th className="border border-gray-300 p-2">Sector</th>
            </tr>
          </thead>
          <tbody>
            {stockOverviews.map((overview) => (
              <tr key={overview.Symbol}>
                <td className="border border-gray-300 p-2">{overview.Name}</td>
                <td className="border border-gray-300 p-2">{overview.Symbol}</td>
                <td className="border border-gray-300 p-2">{overview.MarketCapitalization}</td>
                <td className="border border-gray-300 p-2">{overview.PERatio}</td>
                <td className="border border-gray-300 p-2">{overview.DividendYield}</td>
                <td className="border border-gray-300 p-2">{overview.Sector}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
