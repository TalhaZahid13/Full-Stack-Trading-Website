import CsvStockUploader from '../components/Dashboard/CsvStockUploader';
import { Container } from '@mui/material';
export default function CsvUploadPage()
{
  return (
    <Container sx={{ mt: 3 }}>
      <CsvStockUploader />
    </Container>
  );
}