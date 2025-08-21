import { Readable } from 'stream';
import csv from 'csv-parser';
import stocks from '../models/stock.model.js';
export const uploadCsvStock = async (req, res) => 
{
  try 
  {
    if (!req.file) 
    {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    const results = [];
    const stream = Readable.from(req.file.buffer);
    stream
      .pipe(csv())
      .on('data', (data) => {
        results.push({
          date: data['Date'],
          symbol: data['Symbol']?.trim(),
          code: data['Code'],
          companyname: data['Company Name']?.trim(),
          openprice: parseFloat(data['Open Price']),
          highprice: parseFloat(data['High Price']),
          lowprice: parseFloat(data['Low Price']),
          closeprice: parseFloat(data['Close Price']),
          volume: parseInt(data['Volume']),
          previousclose: parseFloat(data['Previous Close']),
        });
      })
      .on('end', async () => {
        try 
        {
          await stocks.bulkCreate(results, { ignoreDuplicates: true });
          res.status(200).json({ message: 'CSV uploaded successfully', data: results });
        } 
        catch (bulkError) 
        {
          console.error('Error saving to database:', bulkError);
          res.status(500).json({ error: 'Database error while uploading CSV data' });
        }
      });
  } 
  catch (error) 
  {
    console.error('Upload error:', error);
    res.status(500).json({ error: `Error processing CSV file: ${error.message}` });
  }
};
export const getAllStocks = async (req, res) => 
{
  try 
  {
    const stockList = await stocks.findAll({
      attributes: ['symbol', 'companyname', 'closeprice', 'openprice', 'volume'],
    });
    res.status(200).json(stockList);
  }
  catch (error) 
  {
    console.error('Error fetching stocks:', error);
    res.status(500).json({ message: 'Failed to fetch stocks' });
  }
};