import CustomerForm from '../components/Dashboard/CustomerForm';
import PortfolioForm from '../components/Dashboard/PortfolioForm';
import CsvStockUploader from '../components/Dashboard/CsvStockUploader';
import TrendingStocks from './TrendingStocks';
import { Container, Grid, Typography } from '@mui/material';
export default function DashboardPage() 
{
  return (
    <Container sx={{ mt: 3 }}>
      <Typography variant="h4">Dashboard</Typography>
      <TrendingStocks />
      <CsvStockUploader />      
      <Grid container spacing={3} mt={1}>
        <Grid item xs={12} md={6}>
          <CustomerForm />
        </Grid>
        <Grid item xs={12} md={6}>
          <PortfolioForm />
        </Grid>
      </Grid>
    </Container>
  );
}