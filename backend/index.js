import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import { sequelize, testConnection } from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import customerRoutes from './routes/customer.routes.js';
import portfolioRoutes from './routes/portfolio.routes.js';
import stockRoutes from './routes/stock.routes.js';
import orderRoutes from './routes/order.routes.js';
const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/api/auth', authRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/portfolios', portfolioRoutes);
app.use('/api/stocks', stockRoutes);
app.use('/api/orders', orderRoutes);
async function startServer() 
{
  try 
  {
    await testConnection();
    await sequelize.sync({ alter: true });
    console.log('Models synchronized successfully.');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => 
    {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } 
  catch (error) 
  {
    console.error('Failed to start server:', error);
  }
}
startServer();