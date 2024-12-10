import axios from 'axios';

// Alpha Vantage API configuration
const ALPHA_VANTAGE_API_URL = 'https://www.alphavantage.co/query';
const ALPHA_VANTAGE_API_KEY = import.meta.env.VITE_ALPHA_VANTAGE_API_KEY;

// Local storage keys
const REALTIME_STORAGE_KEY = 'realtime_stock_data';
const HISTORICAL_STORAGE_KEY = 'historical_stock_data';

/**
 * Fetch real-time stock data for a given symbol.
 * @param symbol - Stock ticker (e.g., 'AAPL').
 */
export const fetchRealTimeStockData = async (symbol: string) => {
  const cachedData = localStorage.getItem(`${REALTIME_STORAGE_KEY}_${symbol}`);
  if (cachedData) {
    return JSON.parse(cachedData);
  }

  try {
    const response = await axios.get(ALPHA_VANTAGE_API_URL, {
      params: {
        function: 'GLOBAL_QUOTE',
        symbol,
        apikey: ALPHA_VANTAGE_API_KEY,
      },
    });

    const data = response.data['Global Quote'];
    const formattedData = {
      c: parseFloat(data['05. price']), // Current price
      d: parseFloat(data['09. change']), // Change
      dp: parseFloat(data['10. change percent'].replace('%', '')), // Percent change
      h: parseFloat(data['03. high']), // High price of the day
      l: parseFloat(data['04. low']), // Low price of the day
      o: parseFloat(data['02. open']), // Open price of the day
      pc: parseFloat(data['08. previous close']), // Previous close price
    };

    localStorage.setItem(`${REALTIME_STORAGE_KEY}_${symbol}`, JSON.stringify(formattedData)); // Cache data
    return formattedData;
  } catch (error) {
    console.error('Error fetching real-time stock data:', error);
    throw new Error('API limit exceeded or network error');
  }
};

/**
 * Fetch historical stock data for a given symbol.
 * @param symbol - Stock ticker (e.g., 'AAPL').
 */
export const fetchHistoricalStockData = async (symbol: string) => {
  const cachedData = localStorage.getItem(`${HISTORICAL_STORAGE_KEY}_${symbol}`);
  if (cachedData) {
    return JSON.parse(cachedData);
  }

  try {
    const response = await axios.get(ALPHA_VANTAGE_API_URL, {
      params: {
        function: 'TIME_SERIES_DAILY',
        symbol,
        apikey: ALPHA_VANTAGE_API_KEY,
      },
    });

    const timeSeries = response.data['Time Series (Daily)'];
    const formattedData = Object.entries(timeSeries).map(([date, values]: [string, any]) => ({
      date,
      close: parseFloat(values['4. close']),
    })).slice(0, 30); // Limit to the last 30 days

    localStorage.setItem(`${HISTORICAL_STORAGE_KEY}_${symbol}`, JSON.stringify(formattedData)); // Cache data
    return formattedData;
  } catch (error) {
    console.error('Error fetching historical stock data:', error);
    throw new Error('API limit exceeded or network error');
  }
};

/**
 * Fetch stock overview data (e.g., P/E ratio, Market Cap).
 * @param symbol - Stock ticker (e.g., 'AAPL').
 */
export const fetchStockOverview = async (symbol: string) => {
  try {
    const response = await axios.get(ALPHA_VANTAGE_API_URL, {
      params: {
        function: 'OVERVIEW',
        symbol,
        apikey: ALPHA_VANTAGE_API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching stock overview:', error);
    throw new Error('API limit exceeded or network error');
  }
};
