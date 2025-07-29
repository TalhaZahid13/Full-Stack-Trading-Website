import { useState } from 'react';
import { TextField, Button, Paper, Typography, Snackbar, Alert } from '@mui/material';
import axios from '../../api/axios';
export default function PortfolioForm() 
{
    const [formData, setFormData] = useState(
    {
        portfolio_name: '',
        initial_capital: '',
        customer_no: ''
    });
    const [error, setError] = useState(null);
    const [successOpen, setSuccessOpen] = useState(false);
    const handleChange = e => 
    {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const handleSubmit = async e => 
    {
        e.preventDefault();
        try 
        {
            await axios.post('/portfolios', 
            {
                ...formData,
                initial_capital: parseFloat(formData.initial_capital)
            });
            setSuccessOpen(true);
            setFormData({ portfolio_name: '', initial_capital: '', customer_no: '' });
        } 
        catch (err) 
        {
            setError(err.response?.data?.error || 'Failed to create portfolio');
        }
    };
    return (
        <Paper sx={{ p: 3, mt: 2 }}>
        <Typography variant="h6" gutterBottom> Create Portfolio </Typography>
        <form onSubmit={handleSubmit} noValidate>
            <TextField fullWidth label="Portfolio Name" name="portfolio_name" value={formData.portfolio_name} onChange={handleChange} margin="normal" required />
            <TextField fullWidth label="Initial Capital" type="number" name="initial_capital" value={formData.initial_capital} onChange={handleChange} margin="normal" required />
            <TextField fullWidth label="Customer No" name="customer_no" value={formData.customer_no} onChange={handleChange} margin="normal" required />
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>Save Portfolio</Button>
        </form>
        <Snackbar open={successOpen} autoHideDuration={4000} onClose={() => setSuccessOpen(false)}>
            <Alert severity="success" onClose={() => setSuccessOpen(false)}>Portfolio created successfully!</Alert>
        </Snackbar>
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        </Paper>
    );
}