import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://finnhub.io/api/v1/quote',
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
  },
});

export const fetchStockData = async (symbol: string) => {
  const response = await apiClient.get(`/stocks/${symbol}`);
  return response.data;
};
