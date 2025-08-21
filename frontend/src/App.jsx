import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import PrivateRoute from './components/Layout/PrivateRoute';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import DashboardPage from './pages/DashboardPage';
import CsvUploadPage from './pages/CsvUploadPage';
import MarketWatch from './components/Market/MarketWatch';
import CreateOrder from './components/Orders/CreateOrder';
import OrdersPage from './components/Orders/OrderTable';
function App() 
{
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
        <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
        <Route path="/CreateOrder" element={<CreateOrder />} />
        <Route path="/OrderTable" element={<OrdersPage />} />
        <Route path="/market" element={<PrivateRoute><MarketWatch /></PrivateRoute>} />
        <Route path="/csv-upload" element={<PrivateRoute><CsvUploadPage /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;