// components/StockCard.jsx
import React, { useState } from 'react';
import { fetchStockData } from './stockService';

const StockCard = () => {
  const [symbol, setSymbol] = useState('');
  const [stock, setStock] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      const data = await fetchStockData(symbol);
      if (data && data['01. symbol']) {
        setStock(data);
        setError('');
      } else {
        setStock(null);
        setError('No data found for symbol.');
      }
    } catch (err) {
      setError('Something went wrong.');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>📈 Market Watch</h2>
      <div style={styles.searchSection}>
        <input
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value.toUpperCase())}
          placeholder="Enter stock symbol (e.g. AAPL)"
          style={styles.input}
        />
        <button onClick={handleSearch} style={styles.button}>Search</button>
      </div>

      {error && <p style={styles.error}>{error}</p>}

      {stock && (
        <div style={styles.card}>
          <h3 style={styles.symbol}>{stock['01. symbol']}</h3>
          <p><strong>Price:</strong> ${stock['05. price']}</p>
          <p>
            <strong>Change:</strong>{" "}
            <span style={{ color: parseFloat(stock['09. change']) >= 0 ? 'green' : 'red' }}>
              {stock['09. change']} ({stock['10. change percent']})
            </span>
          </p>
          <p><strong>High:</strong> ${stock['03. high']}</p>
          <p><strong>Low:</strong> ${stock['04. low']}</p>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '30px',
    maxWidth: '500px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#1a1a1a',
  },
  searchSection: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    width: '60%',
    borderRadius: '8px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px 15px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    textAlign: 'left',
  },
  symbol: {
    fontSize: '24px',
    marginBottom: '10px',
    color: '#333',
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
};

export default StockCard;
