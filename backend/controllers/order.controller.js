import Order from '../models/order.model.js';
import Stock from '../models/stock.model.js';
import { Op } from 'sequelize';
export const create = async (req, res) => 
{
    try 
    {
        const { stock_id, order_type, order_price, quantity } = req.body;
        const stock = await Stock.findByPk(stock_id);
        if (!stock) return res.status(400).json({ message: 'Invalid stock_id' });
        const order = await Order.create(
        {
            user_id: req.user.id,
            stock_id,
            order_type,
            order_price,
            quantity,
            status: 'pending'
        });
        res.status(201).json(order);
    } 
    catch(err) 
    {
        res.status(400).json({ error: err.message });
    }
};
export const list = async (req, res) => 
{
    try 
    {
        const { stock, status, fromDate, toDate } = req.query;
        let where = { user_id: req.user.id };
        if (stock) 
        {
            let stockFilter = {};
            if (!isNaN(stock)) 
            {
                stockFilter.id = stock;
            } 
            else 
            {
                const foundStock = await Stock.findOne({ where: { symbol: stock } });
                if (!foundStock) return res.json([]);
                stockFilter.id = foundStock.id;
            }
            where.stock_id = stockFilter.id;
        }
        if (status) 
        {
            where.status = status;
        }
        if (fromDate || toDate) 
        {
            where.created_at = {};
            if (fromDate) where.created_at[Op.gte] = new Date(fromDate);
            if (toDate) where.created_at[Op.lte] = new Date(toDate);
        }
        const orders = await Order.findAll({
        where,
        include: [{ model: Stock, attributes: ['symbol', 'name'] }],
        order: [['created_at', 'DESC']]
        });
        const result = orders.map(o => ({
        id: o.id,
        stock_name: o.stock.name,
        stock_symbol: o.stock.symbol,
        order_type: o.order_type,
        order_price: o.order_price,
        quantity: o.quantity,
        status: o.status,
        created_at: o.created_at
        }));
        res.json(result);
    } 
    catch(err) 
    {
        res.status(500).json({ error: err.message });
    }
};