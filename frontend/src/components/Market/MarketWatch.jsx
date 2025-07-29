import { useState, useEffect } from 'react';
import { Paper, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material';
import axios from '../../api/axios';
export default function MarketWatch() 
{
    const [stocks, setStocks] = useState([]);
    const [watchlist, setWatchlist] = useState(() => 
    {
        const saved = localStorage.getItem('watchlist');
        return saved ? JSON.parse(saved) : [];
    });
    useEffect(() => 
    {
        fetchStocks();
    }, []);
    const fetchStocks = async () => 
    {
        try 
        {
            const res = await axios.get('/stocks');
            setStocks(res.data);
        } 
        catch (err) 
        {
            console.error(err);
        }
    };
    const addToWatchlist = symbol => 
    {
        if (watchlist.includes(symbol)) return;
        const newList = [...watchlist, symbol];
        setWatchlist(newList);
        localStorage.setItem('watchlist', JSON.stringify(newList));
    };
    const isUp = (change) => change > 0;
    const isDown = (change) => change < 0;
    return (
    <>
        <Typography variant="h6" mt={3} mb={2}>Market Watch</Typography>
        <TableContainer component={Paper}>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Symbol</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Last Price</TableCell>
                    <TableCell>Change %</TableCell>
                    <TableCell>Volume</TableCell>
                    <TableCell>Add to Watchlist</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {stocks.map(stock =>
                (
                    <TableRow key={stock.id}>
                        <TableCell>{stock.symbol}</TableCell>
                        <TableCell>{stock.name}</TableCell>
                        <TableCell>{stock.last_price}</TableCell>
                        <TableCell sx={
                        { 
                            color: isUp(stock.change_percent) ? 'green' : (isDown(stock.change_percent) ? 'red' : 'inherit')
                        }}>
                        {stock.change_percent ? stock.change_percent.toFixed(2) : '0.00'}%
                        </TableCell>
                        <TableCell>{stock.volume || '-'}</TableCell>
                        <TableCell>
                        <Button 
                            variant="outlined" 
                            size="small" 
                            disabled={watchlist.includes(stock.symbol)}
                            onClick={() => addToWatchlist(stock.symbol)}
                        >Add</Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        </TableContainer>
    </>
  );
}