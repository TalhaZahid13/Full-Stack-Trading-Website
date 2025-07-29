import { useState } from 'react';
import { TextField, Button, Paper, Typography, Snackbar, Alert } from '@mui/material';
import axios from '../../api/axios';
export default function CustomerForm() 
{
    const [formData, setFormData] = useState(
    {
        full_name: '',
        email: '',
        phone: '',
        cnic: '',
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
            await axios.post('/customers', formData);
            setSuccessOpen(true);
            setFormData({ full_name: '', email: '', phone: '', cnic: '', customer_no: '' });
        } 
        catch (err) 
        {
            setError(err.response?.data?.error || 'Failed to create customer');
        }
    };
    return (
        <Paper sx={{ p: 3, mt: 2 }}>
        <Typography variant="h6" gutterBottom> Create Customer </Typography>
        <form onSubmit={handleSubmit} noValidate>
            <TextField fullWidth label="Full Name" name="full_name" value={formData.full_name} onChange={handleChange} margin="normal" required />
            <TextField fullWidth label="Email" name="email" type="email" value={formData.email} onChange={handleChange} margin="normal" required />
            <TextField fullWidth label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} margin="normal" />
            <TextField fullWidth label="CNIC or ID Number" name="cnic" value={formData.cnic} onChange={handleChange} margin="normal" required />
            <TextField fullWidth label="Customer No" name="customer_no" value={formData.customer_no} onChange={handleChange} margin="normal" required />
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>Save Customer</Button>
        </form>
        <Snackbar open={successOpen} autoHideDuration={4000} onClose={() => setSuccessOpen(false)}>
            <Alert severity="success" onClose={() => setSuccessOpen(false)}>Customer created successfully!</Alert>
        </Snackbar>
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        </Paper>
    );
}