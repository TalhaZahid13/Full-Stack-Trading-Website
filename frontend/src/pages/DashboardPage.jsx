import CustomerForm from '../components/Dashboard/CustomerForm';
import PortfolioForm from '../components/Dashboard/PortfolioForm';
import CsvStockUploader from '../components/Dashboard/CsvStockUploader';
import TrendingStocks from './TrendingStocks';
import 
{ 
  Container, 
  Grid, 
  Typography, 
  Paper 
} from '@mui/material';
export default function DashboardPage() 
{
  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: 3,
        pb: 4,
        background: 'linear-gradient(to right, #0f2027, #203a43, #2c5364)',
        borderRadius: 2,
        boxShadow: '0 0 12px rgba(0, 255, 170, 0.2)'
      }}
    >
      <Typography
        variant="h4"
        sx={{
          mb: 2,
          color: '#00ffcc',
          fontWeight: 'bold',
          textShadow: '0 0 3px #00ffcc',
        }}
      >
        Dashboard
      </Typography>
      <Paper elevation={3} sx={{ p: 2, backgroundColor: '#112D4E', color: '#fff' }}>
        <TrendingStocks />
      </Paper>
      <Paper elevation={3} sx={{ mt: 2, p: 2, backgroundColor: '#0F3460', color: '#fff' }}>
        <CsvStockUploader />
      </Paper>
      <Grid container spacing={3} mt={1}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2, backgroundColor: '#393E46', color: '#fff' }}>
            <CustomerForm />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2, backgroundColor: '#222831', color: '#fff' }}>
            <PortfolioForm />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}