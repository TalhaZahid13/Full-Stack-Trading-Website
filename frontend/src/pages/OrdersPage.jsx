import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const OrdersPage = () => {
  const navigate = useNavigate();

  const handlePlaceOrder = () => 
  {
    <Link to="/CreateOrder">Place Trade Order</Link>
    navigate('/CreateOrder'); // ✅ Correct route
  };

  return (
    <div>
      <button onClick={handlePlaceOrder}>Place Order</button>
    </div>
  );
};

export default OrdersPage;
