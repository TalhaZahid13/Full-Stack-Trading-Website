import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import PrivateRoute from './components/Layout/PrivateRoute';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import DashboardPage from './pages/DashboardPage';
import OrdersPage from './pages/OrdersPage';
import CsvUploadPage from './pages/CsvUploadPage';
import StockCard from './components/Services/StockCard';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
        <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
        <Route path="/orders" element={<PrivateRoute><OrdersPage /></PrivateRoute>} />
        <Route path="/market" element={<PrivateRoute><StockCard /></PrivateRoute>} />
        <Route path="/csv-upload" element={<PrivateRoute><CsvUploadPage /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
