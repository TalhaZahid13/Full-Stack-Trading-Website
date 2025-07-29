import React, { useState } from 'react';
import axios from 'axios';
import { Paper, Typography, Button, CircularProgress, Alert } from '@mui/material';
export default function CsvStockUploader() 
{
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState(null);
    const handleFileChange = (e) => 
    {
        setFile(e.target.files[0]);
        setMessage(null);
    };
    const handleUpload = async () => 
    {
        if (!file) return setMessage({ text: 'Please select a file', severity: 'warning' });
        const formData = new FormData();
        formData.append('file', file);
        setUploading(true);
        try 
        {
            const res = await axios.post('/stocks/upload', formData, 
            {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setMessage({ text: `Upload successful: ${res.data.count} stocks processed`, severity: 'success' });
            setFile(null);
        } 
        catch (err) 
        {
          setMessage({ text: err.response?.data?.error || 'Upload failed', severity: 'error' });
        }
        setUploading(false);
    };
    return (
        <Paper sx={{ p: 3, mt: 2 }}>
        <Typography variant="h6" gutterBottom>Upload Stocks CSV</Typography>
        <input type="file" accept=".csv" onChange={handleFileChange} />
        <Button variant="contained" sx={{ mt: 2 }} onClick={handleUpload} disabled={uploading}>
            {uploading ? <CircularProgress size={24} /> : 'Upload & Save'}
        </Button>
        {message && <Alert severity={message.severity} sx={{ mt: 2 }}>{message.text}</Alert>}
        </Paper>
    );
}
