import 
{ 
  useEffect, 
  useState 
} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import 
{
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
  Alert,
  Button
} from '@mui/material';
export default function OrdersPage() 
{
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => 
  {
    const fetchOrders = async () => 
    {
      setError(null);
      try 
      {
        const res = await axios.get('/orders/myorders');
        setOrders(res.data);
      }
      catch (err) 
      {
        setError('❌ Failed to fetch orders: ' + (err.response?.data?.message || err.message));
      }
      finally 
      {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);
  const handlePlaceOrder = () => 
  {
    navigate('/CreateOrder');
  };
  if (loading) return <CircularProgress style={{ display: 'block', margin: 'auto', marginTop: 40 }} />;
  if (error) return <Alert severity="error" style={{ marginTop: 20 }}>{error}</Alert>;
  return (
    <Paper elevation={3} style={{ padding: 20, marginTop: 40 }}>
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
          My Orders
        </Typography>
        <Button variant="contained" color="primary" onClick={handlePlaceOrder}>
          Place New Order
        </Button>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Symbol</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Order Status</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map(order => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.stock_symbol}</TableCell>
                <TableCell>{order.quantity}</TableCell>
                <TableCell>{order.order_type}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>{order.order_price}</TableCell>
                <TableCell>
                  {order.created_at ? new Date(order.created_at).toLocaleString() : 'N/A'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}