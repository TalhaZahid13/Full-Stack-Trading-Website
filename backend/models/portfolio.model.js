import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
const Portfolio = sequelize.define('Portfolio', 
{
  userid: 
  {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  symbol: 
  {
    type: DataTypes.STRING,
    allowNull: false,
  },
  qty: 
  {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  currentPrice: 
  {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  avgBuyPrice: 
  {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  marketValue: 
  {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  unrealizedPL: 
  {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});
export default Portfolio;