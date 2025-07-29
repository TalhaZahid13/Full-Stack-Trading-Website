import { useEffect, useState } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Paper, Typography, Snackbar, Alert } from '@mui/material';
import axios from '../../api/axios';
export default function OrderForm() 
{
    const [stocks, setStocks] = useState([]);
    const [form, setForm] = useState(
    {
        stock_id: '',
        order_type: 'Buy',
        order_price: '',
        quantity: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    useEffect(() => 
    {
        axios.get('/stocks').then(res => setStocks(res.data));
    }, []);
    const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    const handleSubmit = async e => 
    {
        e.preventDefault();
        setError('');
        if (!form.stock_id || !form.order_price || !form.quantity) 
        {
            setError('Fill all required fields');
            return;
        }
        try 
        {
            await axios.post('/orders', 
            {
                stock_id: parseInt(form.stock_id),
                order_type: form.order_type,
                order_price: parseFloat(form.order_price),
                quantity: parseInt(form.quantity)
            });
        setSuccess(true);
        setForm({ stock_id: '', order_type: 'Buy', order_price: '', quantity: '' });
        } 
        catch (err) 
        {
          setError(err.response?.data?.error || 'Error placing order');
        }
    };
    return (
        <Paper sx={{ p: 3, mt: 2 }}>
        <Typography variant="h6" gutterBottom>Place Buy/Sell Order</Typography>
        <form onSubmit={handleSubmit} noValidate>
            <FormControl fullWidth margin="normal" required>
            <InputLabel>Stock</InputLabel>
            <Select 
                value={form.stock_id}
                onChange={e => setForm(prev => ({ ...prev, stock_id: e.target.value }))}
                label="Stock"
            >
            {stocks.map(s => (
            <MenuItem key={s.id} value={s.id}>{s.symbol} - {s.name}</MenuItem>
            ))}
            </Select>
            </FormControl>
            <FormControl fullWidth margin="normal" required>
            <InputLabel>Order Type</InputLabel>
            <Select value={form.order_type} onChange={e => setForm(prev => ({ ...prev, order_type: e.target.value }))} label="Order Type">
                <MenuItem value="Buy">Buy</MenuItem>
                <MenuItem value="Sell">Sell</MenuItem>
            </Select>
            </FormControl>
            <TextField 
            fullWidth
            label="Order Price (limit)"
            name="order_price"
            margin="normal"
            type="number"
            value={form.order_price}
            onChange={handleChange}
            required
            />
            <TextField 
            fullWidth
            label="Quantity"
            name="quantity"
            margin="normal"
            type="number"
            value={form.quantity}
            onChange={handleChange}
            required
            />
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>Place Order</Button>
        </form>
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        <Snackbar open={success} autoHideDuration={4000} onClose={() => setSuccess(false)}>
            <Alert severity="success">Order placed successfully!</Alert>
        </Snackbar>
        </Paper>
    );
}