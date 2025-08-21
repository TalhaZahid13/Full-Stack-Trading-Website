import 
{ 
  useState, 
  useEffect 
} from 'react';
import {
  Typography,
  TextField,
  MenuItem,
  Button,
  Paper,
  Alert
} from '@mui/material';
import axios from '../../api/axios';
export default function CreateOrder() 
{
  const [stocks, setStocks] = useState([]);
  const [selectedStock, setSelectedStock] = useState('');
  const [orderType, setOrderType] = useState('buy');
  const [orderPrice, setOrderPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [status, setStatus] = useState('pending');
  const [timestamp, setTimestamp] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  useEffect(() => 
  {
    fetchStocks();
  }, []);
  const fetchStocks = async () => 
  {
    try 
    {
      const res = await axios.get('/stocks');
      setStocks(res.data);
      if (res.data.length > 0) 
      {
        setSelectedStock(res.data[0].symbol);
      }
    } 
    catch (err) 
    {
      console.error(err);
      setError('❌ Failed to fetch stocks.');
    }
  };
  const handleSubmit = async (e) => 
  {
    e.preventDefault();
    setError('');
    setSuccess('');
    const parsedPrice = parseFloat(orderPrice);
    const parsedQuantity = parseInt(quantity);
    if (!selectedStock || isNaN(parsedPrice) || isNaN(parsedQuantity) || !timestamp) 
    {
      setError('⚠️ Please fill all fields correctly.');
      return;
    }
    const token = localStorage.getItem('token');
    if (!token) 
    {
      setError('❌ No token found. Please log in again.');
      return;
    }
    try 
    {
      const response = await axios.post(
        '/orders',
        {
          stock_symbol: selectedStock,
          order_type: orderType,
          order_price: parsedPrice,
          quantity: parsedQuantity,
          status,
          timestamp
        },
        {
          headers: 
          {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log(response.data);
      setSuccess('✅ Order placed successfully! ');
      setOrderPrice('');
      setQuantity('');
      setStatus('pending');
      setTimestamp('');
    } 
    catch (err) 
    {
      console.error(err);
      setError('❌ Failed to place order. ' + (err.response?.data?.message || err.message));
    }
  };
  return (
    <Paper sx={{ p: 3, mt: 4 }}>
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
          fontWeight: "bold",
          color: '#00ffcc',
          textShadow: '0 0 3px #00ffcc',
        }}
      >
        Create Order
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          select
          label="Select Stock"
          value={selectedStock || ''}
          onChange={e => setSelectedStock(e.target.value)}
          margin="normal"
          required
        >
          {stocks.map(stock => (
            <MenuItem key={stock.symbol} value={stock.symbol}>
              {stock.symbol}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          fullWidth
          select
          label="Order Type"
          value={orderType}
          onChange={e => setOrderType(e.target.value)}
          margin="normal"
          required
        >
          <MenuItem value="buy">Buy</MenuItem>
          <MenuItem value="sell">Sell</MenuItem>
        </TextField>
        <TextField
          fullWidth
          label="Order Price"
          type="number"
          value={orderPrice}
          onChange={e => setOrderPrice(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Quantity"
          type="number"
          value={quantity}
          onChange={e => setQuantity(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          select
          label="Status"
          value={status}
          onChange={e => setStatus(e.target.value)}
          margin="normal"
          required
        >
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
          <MenuItem value="cancelled">Cancelled</MenuItem>
        </TextField>
        <TextField
          fullWidth
          label="Timestamp"
          type="datetime-local"
          InputLabelProps={{ shrink: true }}
          value={timestamp}
          onChange={e => setTimestamp(e.target.value)}
          margin="normal"
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Place Order
        </Button>
      </form>
    </Paper>
  );
}