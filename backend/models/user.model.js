import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
const User = sequelize.define('user', 
{
  id:
  {
    type:DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  full_name: 
  {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: 
  {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: 
  {
    type: DataTypes.STRING,
    allowNull: false
  }
});
export default User;