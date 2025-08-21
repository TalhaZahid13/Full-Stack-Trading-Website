import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
const Customer = sequelize.define('customer', 
{
  full_name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING },
  cnic: { type: DataTypes.STRING, allowNull: false },
}, 
{
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
});
export default Customer;