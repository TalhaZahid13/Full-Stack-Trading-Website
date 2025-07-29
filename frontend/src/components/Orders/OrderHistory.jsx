import { useState, useEffect } from 'react';
import { Paper, Typography, Select, MenuItem, FormControl, InputLabel, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TableSortLabel, TextField, Box } from '@mui/material';
import axios from '../../api/axios';
import { format } from 'date-fns';
export default function OrderHistory() 
{
    const [orders, setOrders] = useState([]);
    const [filters, setFilters] = useState({ stock: '', status: '', fromDate: '', toDate: '' });
    useEffect(() => 
    {
        fetchOrders();
    }, []);
    const fetchOrders = async (query = '') => 
    {
        try 
        {
            const res = await axios.get(`/orders${query}`);
            setOrders(res.data);
        } 
        catch (err) 
        {
            console.error(err);
        }
    };
    const handleFilterChange = e => 
    {
        setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const applyFilters = () => 
    {
        let q = '?';
        if (filters.stock) q += `stock=${filters.stock}&`;
        if (filters.status) q += `status=${filters.status}&`;
        if (filters.fromDate) q += `fromDate=${filters.fromDate}&`;
        if (filters.toDate) q += `toDate=${filters.toDate}&`;
        fetchOrders(q);
    };
    return (
        <>
        <Typography variant="h6" mt={3} mb={2}>Order History</Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
            <TextField label="Stock Symbol" name="stock" value={filters.stock} onChange={handleFilterChange} size="small"/>
            <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Status</InputLabel>
                <Select name="status" value={filters.status} label="Status" onChange={handleFilterChange}>
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="executed">Executed</MenuItem>
                    <MenuItem value="cancelled">Cancelled</MenuItem>
                </Select>
            </FormControl>
            <TextField type="date" label="From" name="fromDate" value={filters.fromDate} onChange={handleFilterChange} InputLabelProps={{ shrink: true }} size="small" />
            <TextField type="date" label="To" name="toDate" value={filters.toDate} onChange={handleFilterChange} InputLabelProps={{ shrink: true }} size="small" />
            <Button variant="outlined" size="small" onClick={applyFilters}>Apply</Button>
        </Box>
        <TableContainer component={Paper}>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Stock Symbol</TableCell>
                    <TableCell>Stock Name</TableCell>
                    <TableCell>Order Type</TableCell>
                    <TableCell>Order Price</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Timestamp</TableCell>
                </TableRow>
            </TableHead>
        <TableBody>
            {orders.map(order => 
            (
                <TableRow key={order.id} sx={
                {
                    bgcolor: order.status === 'executed' ? 'rgba(76,175,80,0.1)' :
                        order.status === 'cancelled' ? 'rgba(244,67,54,0.1)' :
                        'inherit'
                }}>
                <TableCell>{order.stock_symbol}</TableCell>
                <TableCell>{order.stock_name}</TableCell>
                <TableCell>{order.order_type}</TableCell>
                <TableCell>{order.order_price}</TableCell>
                <TableCell>{order.quantity}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>{format(new Date(order.created_at), 'PPpp')}</TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}