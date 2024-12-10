import React, { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function Settings(): JSX.Element {
  const { darkMode, toggleDarkMode } = useTheme();
  const [defaultStocks, setDefaultStocks] = useState<string>('AAPL,MSFT');
  const [timeRange, setTimeRange] = useState<string>('1m');
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(true);

  const handleSave = () => {
    localStorage.setItem('defaultStocks', defaultStocks);
    localStorage.setItem('timeRange', timeRange);
    localStorage.setItem('notificationsEnabled', JSON.stringify(notificationsEnabled));
    alert('Settings saved!');
  };

  useEffect(() => {
    setDefaultStocks(localStorage.getItem('defaultStocks') || 'AAPL,MSFT');
    setTimeRange(localStorage.getItem('timeRange') || '1m');
    setNotificationsEnabled(JSON.parse(localStorage.getItem('notificationsEnabled') || 'true'));
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      {/* Theme Settings */}
      <section className="mb-6">
        <h2 className="text-lg font-bold mb-2">Theme</h2>
        <label className="flex items-center space-x-3">
          <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
          <span>{darkMode ? 'Dark Mode Enabled' : 'Enable Dark Mode'}</span>
        </label>
      </section>

      {/* Default Stocks */}
      <section className="mb-6">
        <h2 className="text-lg font-bold mb-2">Default Stocks</h2>
        <input
          type="text"
          value={defaultStocks}
          onChange={(e) => setDefaultStocks(e.target.value)}
          placeholder="e.g., AAPL,MSFT"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <small className="text-gray-500">
          Enter stock symbols separated by commas (e.g., AAPL,MSFT,GOOGL).
        </small>
      </section>

      {/* Time Range */}
      <section className="mb-6">
        <h2 className="text-lg font-bold mb-2">Default Time Range</h2>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="1m">1 Month</option>
          <option value="3m">3 Months</option>
          <option value="6m">6 Months</option>
          <option value="1y">1 Year</option>
        </select>
      </section>

      {/* Notifications */}
      <section className="mb-6">
        <h2 className="text-lg font-bold mb-2">Notifications</h2>
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={notificationsEnabled}
            onChange={(e) => setNotificationsEnabled(e.target.checked)}
          />
          <span>{notificationsEnabled ? 'Notifications Enabled' : 'Enable Notifications'}</span>
        </label>
      </section>

      {/* Save Button */}
      <div className="text-right">
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}
