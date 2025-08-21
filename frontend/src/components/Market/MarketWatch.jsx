import 
{ 
  useState, 
  useEffect 
} from 'react';
import 
{
  Paper,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import axios from '../../api/axios';
export default function MarketWatch() 
{
  const [stocks, setStocks] = useState([]);
  const [watchlist, setWatchlist] = useState(() => 
  {
    const saved = localStorage.getItem('watchlist');
    return saved ? JSON.parse(saved) : [];
  });
  const [message, setMessage] = useState('');
  const [cartOpen, setCartOpen] = useState(false);
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
      console.error('Error fetching stocks:', err);
    }
    console.log("Stock data:", stocks);
    console.log(stocks.openprice, stocks.closeprice);
  };
  const addToWatchlist = (symbol) => 
  {
    if (watchlist.includes(symbol)) 
    {
      setMessage(`"${symbol}" is already in your Watch List.`);
      return;
    }
    const updatedList = [...watchlist, symbol];
    setWatchlist(updatedList);
    localStorage.setItem('watchlist', JSON.stringify(updatedList));
    setMessage(`"${symbol}" ✅ added to your Watch List.`);
  };
  const getChangeColor = (changePercent) => 
  {
    if (changePercent > 0) return 'green';
    if (changePercent < 0) return 'red';
    if (changePercent == 0) return 'blue';
    console.log("Change Percent% : " , changePercent);
    return 'inherit';
  };
  const cartStocks = stocks.filter(stock => watchlist.includes(stock.symbol));
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography
          variant="h5"
          mt={4}
          mb={2}
          sx={{
            textAlign: "center",
            background: 'linear-gradient(to right, #0f2027, #203a43, #2c5364)',
            borderRadius: 2,
            boxShadow: '0 0 12px rgba(0, 255, 170, 0.2)',
            padding: "10px",
            fontWeight: "bold",
            color: '#00ffcc',
            textShadow: '0 0 3px #00ffcc',
            flex: 1
          }}
        >
          📈 Market Watch
        </Typography>
        <Button
          variant="contained"
          sx={{
            textAlign: "center",
            background: 'linear-gradient(to right, #0f2027, #203a43, #2c5364)',
            borderRadius: 2,
            boxShadow: '0 0 12px rgba(0, 255, 170, 0.2)',
            height: '60px',
            mt: 2,
            ml: 2
          }}
          onClick={() => setCartOpen(true)}
        >
          👀 Watch List ({watchlist.length})
        </Button>
      </div>
      {message && (
        <Alert severity="info" sx={{ mb: 2 }}>
          {message}
        </Alert>
      )}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Symbol</strong></TableCell>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Close Price</strong></TableCell>
              <TableCell><strong>Change %</strong></TableCell>
              <TableCell><strong>Volume</strong></TableCell>
              <TableCell><strong>Watch List</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stocks.map((stocks) => 
            {
              const open = parseFloat(stocks.openprice);
              const close = parseFloat(stocks.closeprice);
              const changePercent = ((!isNaN(open) && open !== 0 ? ((close - open) / open) * 100 : 0)).toFixed(2);
              return (
                <TableRow key={stocks.symbol}>
                  <TableCell>{stocks.symbol}</TableCell>
                  <TableCell>{stocks.companyname || "-"}</TableCell>
                  <TableCell>
                    {!isNaN(close) ? close.toFixed(2) : "-"}
                  </TableCell>
                  <TableCell sx={{ color: getChangeColor(changePercent) }}>
                    {changePercent}%
                  </TableCell>
                  <TableCell>{stocks.volume ?? 0}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      size="small"
                      disabled={watchlist.includes(stocks.symbol)}
                      onClick={() => addToWatchlist(stocks.symbol)}
                    >
                      {watchlist.includes(stocks.symbol) ? 'Added ✅' : 'Add to Watch List'}
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={cartOpen} onClose={() => setCartOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Your Watch List</DialogTitle>
        <DialogContent>
          {cartStocks.length > 0 ? (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Symbol</strong></TableCell>
                  <TableCell><strong>Name</strong></TableCell>
                  <TableCell><strong>Close Price</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartStocks.map((stocks) => (
                  <TableRow key={stocks.symbol}>
                    <TableCell>{stocks.symbol}</TableCell>
                    <TableCell>{stocks.companyname || "-"}</TableCell>
                    <TableCell>
                      {stocks.closeprice ? parseFloat(stocks.closeprice).toFixed(2) : "-"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <Typography>No stocks in your Watch List yet.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCartOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}