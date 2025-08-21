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
import uploadRoutes from './routes/upload.routes.js';
const app = express();
app.use(cors(
  {
  origin: 'http://localhost:3000',
}));
app.get("/", (req, res) => {
  res.send("Docker is running Back-End 🚀");
});
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use('/uploads', express.static('uploads'));
app.use('/api/auth', authRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/stocks', stockRoutes);
app.use('/api/orders', orderRoutes);
app.use('/upload', uploadRoutes);
async function startServer() 
{
  try 
  {
    await testConnection();
    await sequelize.sync({ alter: true });
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => 
    {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  } 
  catch (error) 
  {
    console.error('❌ Failed to start server:', error);
  }
}
startServer();