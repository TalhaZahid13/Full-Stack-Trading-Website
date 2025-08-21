import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Stock from './stock.model.js';
import User from './user.model.js';
const Order = sequelize.define('trade_orders', 
{
  order_type: 
  {
    type: DataTypes.STRING,
    allowNull: false
  },
  order_price: 
  {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  quantity: 
  {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  status: 
  {
    type: DataTypes.STRING,
    defaultValue: 'pending'
  }
}, 
{
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
});
Order.belongsTo(User, {foreignKey:'user_id', as : 'user'})
Order.belongsTo(Stock, { foreignKey: 'stock_id', as: 'stock' });
export default Order;