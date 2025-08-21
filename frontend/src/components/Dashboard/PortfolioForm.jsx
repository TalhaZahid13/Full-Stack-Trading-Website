import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import 
{ 
  Table, 
  TableHead, 
  TableRow,
  TableCell, 
  TableBody, 
  Paper, 
  Typography, 
  CircularProgress 
} from '@mui/material';
export default function PortfolioScreen() 
{
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => 
  {
    const fetchPortfolio = async () => 
    {
      try 
      {
        const response = await axios.get('/portfolio');
        let data = response.data;
        if (!Array.isArray(data)) 
        {
          data = data.portfolio || []; 
        }
        const formattedData = data.map((item) => 
        {
          const avgBuyPrice = parseFloat(item.avgBuyPrice) || 0;
          const currentValue = parseFloat(item.marketValue) || 0;
          const quantity = parseFloat(item.qty) || 0;
          const  profitLoss = ((currentValue - avgBuyPrice) * quantity);
          return {
            ...item,
            avgBuyPrice,
            currentValue,
            quantity,
            profitLoss,
          };
        });
        setPortfolio(formattedData);
      } 
      catch (error) 
      {
        console.error('Failed to load portfolio', error);
        setPortfolio([]);
      } 
      finally 
      {
        setLoading(false);
      }
    };
    fetchPortfolio();
  }, []);
  if (loading) return <CircularProgress />;
  return (
    <Paper style={{ padding: 20 }}>
      <Typography
          variant="h5"
          mt={4}
          mb={2}
          sx={{
              textAlign: "center",
              background: 'linear-gradient(to right, #0f2027, #203a43, #2c5364)',
              borderRadius: 2,
              boxShadow: '0 0 12px rgba(0, 255, 170, 0.2)',
              padding: "10px",
              borderRadius: "8px",
              fontWeight: "bold",
              color: '#00ffcc',
              fontWeight: 'bold',
              textShadow: '0 0 3px #00ffcc',
          }}
      >
        Portfolio
      </Typography>
      <Table>
        <TableHead>
          <TableRow sx={{
              textAlign: "center",
              background: 'linear-gradient(to right, #0f2027, #203a43, #2c5364)',
              borderRadius: 2,
              boxShadow: '0 0 12px rgba(0, 255, 170, 0.2)',
              padding: "10px",
              borderRadius: "8px",
              fontWeight: "bold",
              color: '#00ffcc',
              fontWeight: 'bold',
              textShadow: '0 0 3px #00ffcc',
          }}>
            <TableCell>Symbol</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Avg Buy Price</TableCell>
            <TableCell>Current Value</TableCell>
            <TableCell>Profit / Loss</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {portfolio.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.symbol}</TableCell>
              <TableCell>{row.quantity}</TableCell>
              <TableCell>{row.avgBuyPrice.toFixed(2)}</TableCell>
              <TableCell>{row.currentValue.toFixed(2)}</TableCell>
              <TableCell
                style={{ color: row.profitLoss >= 0 ? 'green' : 'red' }}
              >
              {row.profitLoss.toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}