import Sequelize from 'sequelize';
import { sequelize } from '../config/db.js';
import StockInit from './stock.model.js';
import TradeOrderInit from './order.model.js';
import User from './user.model.js';

const models = {};
models.User = User;
models.Stock = StockInit(sequelize, Sequelize.DataTypes);
models.TradeOrder = TradeOrderInit(sequelize, Sequelize.DataTypes);
Object.values(models).forEach((model) => 
{
    if (model.associate) 
    {
        model.associate(models);
    }
});
export { sequelize };
export default models;