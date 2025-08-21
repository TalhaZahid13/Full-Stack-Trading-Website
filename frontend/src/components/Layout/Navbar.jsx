import React from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const linkStyle = {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: '14px',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: '#00E3E3',
      color: '#1B1F3B',
      boxShadow: '0px 2px 10px rgba(0, 227, 227, 0.4)',
    },
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1B1F3B', boxShadow: 'none' }}>
      <Toolbar>
        <Button sx={linkStyle} component={Link} to="/dashboard">Dashboard</Button>
        <Button sx={linkStyle} component={Link} to="/CreateOrder">Orders</Button>
        <Button sx={linkStyle} component={Link} to="/OrderTable">Order List</Button>
        <Button sx={linkStyle} component={Link} to="/market">Market Watch</Button>
        <Button sx={linkStyle} component={Link} to="/csv-upload">CSV Upload</Button>
        <Button sx={{ ...linkStyle, marginLeft: 'auto' }} onClick={logout}>Logout</Button>
      </Toolbar>
    </AppBar>
  );
}
