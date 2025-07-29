import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import User from './user.model.js';
import Stock from './stock.model.js';
const TradeOrder = sequelize.define('TradeOrder', 
{
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  stock_id: { type: DataTypes.INTEGER, allowNull: false },
  order_type: { type: DataTypes.ENUM('Buy', 'Sell'), allowNull: false },
  order_price: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
  quantity: { type: DataTypes.INTEGER, allowNull: false },
  status: { type: DataTypes.ENUM('pending', 'executed', 'cancelled'), defaultValue: 'pending' },
}, 
{
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});
TradeOrder.belongsTo(User, { foreignKey: 'user_id' });
TradeOrder.belongsTo(Stock, { foreignKey: 'stock_id' });
export default TradeOrder;