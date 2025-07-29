import { AppBar, Toolbar, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
export default function Navbar() 
{
    const navigate = useNavigate();
    const logout = () => 
    {
        localStorage.removeItem('token');
        navigate('/login');
      };
    return (
    <AppBar position="static">
        <Toolbar>
        <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>
        <Button color="inherit" component={Link} to="/orders">Orders</Button>
        <Button color="inherit" component={Link} to="/market">Market Watch</Button>
        <Button color="inherit" component={Link} to="/csv-upload">CSV Upload</Button>
        <Button color="inherit" sx={{ marginLeft: 'auto' }} onClick={logout}>Logout</Button>
        </Toolbar>
    </AppBar>
    );
}
