import OrderForm from '../components/Orders/OrderForm';
import OrderHistory from '../components/Orders/OrderHistory';
import { Container } from '@mui/material';
export default function OrdersPage() 
{
  return (
    <Container sx={{ mt: 3 }}>
      <OrderForm />
      <OrderHistory />
    </Container>
  );
}