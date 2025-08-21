import React from 'react';
const trendingData = 
[
  {
    Symbol: 'PIAHCLB',
    Code: '813',
    'Company Name': 'PIA Holding CompanyB',
    'Open Price': '23670',
    'High Price': '23670',
    'Low Price': '21518',
    'Close Price': '23670',
    Volume: '175',
    'Previous Close': '57.6'
  },
  {
    Symbol: 'BIPL-AUG',
    Code: '40',
    'Company Name': 'Bankislami Pak',
    'Open Price': '0',
    'High Price': '0',
    'Low Price': '0',
    'Close Price': '36.57',
    Volume: '0',
    'Previous Close': '36.37'
  },
  {
    //Date: '4-Jul-25',
    Symbol: 'BIFO',
    Code: '805',
    'Company Name': 'Biafo Industries',
    'Open Price': '173.11',
    'High Price': '176.5',
    'Low Price': '173.11',
    'Close Price': '175.09',
    Volume: '64320',
    'Previous Close': '176.13'
  },
];
const TrendingStocks = () => 
{
  return (
    <div style={styles.container}>
      <h2 style={styles.header}>🔥 Trending Stocks</h2>
      <div style={styles.grid}>
        {trendingData.map((stock, index) => 
        (
          <div key={index} style={styles.card}>
          {/*<p><strong>📆 Date:</strong> {stock.Date}</p>*/}
            <p><strong>🏭 Company Name:</strong> {stock['Company Name']}</p>
            <p>
              <strong>📭 Open Price:</strong>{' '}
              <span style={{ color: parseFloat(stock['Open Price']) > parseFloat(stock['Previous Close']) ? 'white' : 'white' }}>
                {stock['Open Price']}
              </span>
            </p>
            <p>
              <strong>📈 High Price:</strong>{' '}
              <span style={{ color: parseFloat(stock['High Price']) > parseFloat(stock['Previous Close']) ? 'green' : 'green' }}>
                {stock['High Price']}
              </span>
            </p>
            <p>
              <strong>📉 Low Price:</strong>{' '}
              <span style={{ color: parseFloat(stock['Low Price']) > parseFloat(stock['Previous Close']) ? 'red' : 'red' }}>
                {stock['Low Price']}
              </span>
            </p>
            <p>
              <strong>📪 Close Price:</strong>{' '}
              <span style={{ color: parseFloat(stock['Close Price']) > parseFloat(stock['Previous Close']) ? 'yellow' : 'yellow' }}>
                {stock['Close Price']}
              </span>
            </p>
            <p>
              <strong>🔒 Previous Close:</strong>{' '}
                <span style={{ color: parseFloat(stock['Previous Close']) > parseFloat(stock['Previous Close']) ? 'blue' : 'blue' }}>
                {stock['Previous Close']}
                </span>  
            </p>
            <p>
              <strong>🗑️ Volume:</strong>{' '}
              <span style={{color: parseFloat(stock['Volume']) > parseFloat(stock['Volume']) ? 'cyan' : 'cyan' }}>
                {stock['Volume']}
              </span>
              </p>
          </div>
        ))}
      </div>
    </div>
  );
};
const styles = 
{
  container: 
  {
    padding: '30px',
    maxWidth: '1000px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
  },
  header: 
  {
    textAlign: 'center',
    marginBottom: '20px',
  },
  grid: 
  {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px',
  },
  card: 
  {
    backgroundColor: '#000000ff',
    color: 'white',
    borderRadius: '10px',
    padding: '15px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    textAlign: 'left',
  },
};
export default TrendingStocks;