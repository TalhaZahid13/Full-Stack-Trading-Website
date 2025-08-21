import { DataTypes, STRING } from 'sequelize';
import sequelize from '../config/db.js';
const stocks = sequelize.define("stocks", {
  symbol: DataTypes.STRING,
  code: DataTypes.STRING,
  companyname: DataTypes.STRING,
  openprice: DataTypes.DECIMAL,
  highprice:DataTypes.DECIMAL,
  lowprice:DataTypes.DECIMAL,
  volume: DataTypes.DECIMAL,
  closeprice: DataTypes.DECIMAL
});
export default stocks;