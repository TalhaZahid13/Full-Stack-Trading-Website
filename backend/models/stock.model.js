import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
const Stock = sequelize.define('stock', 
{
    symbol: 
    {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    name: 
    {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_price: 
    {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    change_percent: 
    {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    volume: 
    {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, 
{
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
});
export default Stock;