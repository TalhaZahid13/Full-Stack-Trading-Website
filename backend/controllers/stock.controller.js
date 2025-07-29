import Stock from '../models/stock.model.js';
import csv from 'csv-parser';
import fs from 'fs';
export const uploadCSV = (req, res) => 
{
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });
    const results = [];
    fs.createReadStream(req.file.path)
    .pipe(csv())
    .on('data', (data) => 
    {
        results.push(
        {
            symbol: data.symbol,
            name: data.name,
            last_price: parseFloat(data.last_price),
            change_percent: parseFloat(data.change_percent),
            volume: data.volume ? parseInt(data.volume) : null,
        });
    })
    .on('end', async () => 
    {
        try 
        {
            for (const stockData of results) 
            {
                await Stock.upsert(stockData);
            }
            fs.unlinkSync(req.file.path);
            res.json({ message: 'CSV uploaded and stocks updated', count: results.length });
        } 
        catch (err) 
        {
            res.status(500).json({ error: err.message });
        }
    });
};
export const list = async (req, res) => 
{
    try 
    {
        const stocks = await Stock.findAll();
        res.json(stocks);
    } 
    catch (err) 
    {
        res.status(500).json({ error: err.message });
    }
};
