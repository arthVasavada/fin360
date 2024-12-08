import axios from 'axios';

// Base URL and API key from environment variables
const FINNHUB_API_URL = import.meta.env.VITE_FINNHUB_API_URL;
const FINNHUB_API_KEY = import.meta.env.VITE_FINNHUB_API_KEY;

const finnhubClient = axios.create({
  baseURL: FINNHUB_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to fetch stock data for a given symbol
export const fetchStockData = async (symbol: string) => {
  try {
    const response = await finnhubClient.get('/quote', {
      params: {
        symbol,
        token: FINNHUB_API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching stock data:', error);
    throw error;
  }
};
