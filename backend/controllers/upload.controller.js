import csv from 'csv-parser';
import { Readable } from 'stream';
export const uploadCsv = async (req, res) => 
{
  try 
  {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    const results = [];
    const stream = Readable.from(req.file.buffer);
    stream
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        res.status(200).json({ message: 'CSV uploaded successfully', data: results });
      });
  } 
  catch (err) 
  {
    console.error('CSV Upload Error:', err);
    res.status(500).json({ message: 'Error processing CSV file', error: err.message });
  }
};