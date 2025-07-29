import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();
export const sequelize = new Sequelize
(
  process.env.DB_NAME || 'jwt_auth',
  process.env.DB_USER,
  process.env.DB_PASS || '',
  {
    host: process.env.DB_HOST || 'localhost',
    port: 3306,
    dialect: 'mysql',
    logging: false,
    pool:
    {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    define: 
    {
      freezeTableName: true,
      timestamps: false
    }
  }
);
export async function testConnection() 
{
  try 
  {
    await sequelize.authenticate();
    console.log('MySQL connection has been established successfully with ' + process.env.DB_NAME);
  } 
  catch (error) 
  {
    console.error('Unable to connect to MySQL database:', error);
  }
}