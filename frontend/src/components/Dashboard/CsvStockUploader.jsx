import React, { useState } from 'react';
import axios from '../../api/axios';
import 
{ 
  Paper, 
  Typography, 
  Button, 
  CircularProgress, 
  Alert 
} from '@mui/material';
export default function CsvStockUploader() 
{
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const handleFileChange = (e) => 
  {
    setFile(e.target.files[0]);
    setMessage(null);
    setError(null);
  };
  const handleUpload = async () => 
  {
    if (!file) 
    {
      setError('Please select a file first');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    setUploading(true);
    setMessage(null);
    setError(null);
    try 
    {
      const res = await axios.post('/stocks/upload', formData, 
      {
        headers: 
        {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setMessage(res.data.message || 'Upload successful');
      setFile(null);
    }
    catch (err) 
    {
      console.error(err);
      setError('Upload failed: ' + (err?.response?.data?.error || err.message));
    } finally {
      setUploading(false);
    }
  };
  return (
    <Paper sx={{ p: 3, mt: 4 }}>
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
          borderRadius: "8px",
          fontWeight: "bold",
           color: '#00ffcc',
          fontWeight: 'bold',
          textShadow: '0 0 3px #00ffcc',
        }}
      >
        Upload CSV File
      </Typography>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <Button 
        variant="contained" 
        onClick={handleUpload} 
        disabled={uploading || !file}
        sx={{ mt: 2 }}
      >
        {uploading ? <CircularProgress size={24} /> : 'Upload'}
      </Button>
      {message && <Alert severity="success" sx={{ mt: 2 }}>{message}</Alert>}
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
    </Paper>
  );
}