const API_KEY = 'LTWHPIGY3UFLMQMU';

export const fetchStockData = async (symbol) => {
  const res = await fetch(
    `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`
  );
  const data = await res.json();
  return data['Global Quote'];
};
