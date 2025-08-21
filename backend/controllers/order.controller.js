import Order from '../models/order.model.js';
import Stock from '../models/stock.model.js';
import { Op } from 'sequelize';

// ✅ Create Order
export const create = async (req, res) => {
    try {
        const { stock_symbol, order_type, order_price, quantity, status, timestamp } = req.body;

        if (!stock_symbol) {
            return res.status(400).json({ message: 'Stock symbol is required' });
        }

        const stock = await Stock.findOne({ where: { symbol: stock_symbol.trim() } });
        if (!stock) {
            return res.status(400).json({ message: 'Invalid stock symbol' });
        }

        const order = await Order.create({
            user_id: req.user.id,
            stock_id: stock.id,
            order_type,
            order_price,
            quantity,
            status: status || 'pending',
            created_at: timestamp || new Date()
        });

        res.status(201).json(order);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// ✅ List Orders
export const list = async (req, res) => {
    try {
        const { stock, status, fromDate, toDate } = req.query;
        let where = { user_id: req.user.id };

        if (stock) {
            let stockFilter = {};
            if (!isNaN(stock)) {
                stockFilter.id = stock;
            } else {
                const foundStock = await Stock.findOne({ where: { symbol: stock } });
                if (!foundStock) return res.json([]);
                stockFilter.id = foundStock.id;
            }
            where.stock_id = stockFilter.id;
        }

        if (status) {
            where.status = status;
        }

        if (fromDate || toDate) {
            where.created_at = {};
            if (fromDate) where.created_at[Op.gte] = new Date(fromDate);
            if (toDate) where.created_at[Op.lte] = new Date(toDate);
        }

        const orders = await Order.findAll({
            where,
            include: [{ model: Stock, as: 'stock', attributes: ['symbol', 'companyname'] }], // ✅ alias fixed
            order: [['created_at', 'DESC']]
        });

        const result = orders.map(o => ({
            id: o.id,
            stock_name: o.stock.companyname,
            stock_symbol: o.stock.symbol,
            order_type: o.order_type,
            order_price: o.order_price,
            quantity: o.quantity,
            status: o.status,
            created_at: o.created_at
        }));

        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ✅ Get User Orders
export const getUserOrders = async (req, res) => {
    try {
        const userId = req.user.id;
        const userOrders = await Order.findAll({
            where: { user_id: userId },
            include: [
                { model: Stock, as: 'stock', attributes: ['symbol', 'companyname'] } // ✅ changed 'stocks' → 'stock'
            ],
            order: [['created_at', 'DESC']]
        });

        const result = userOrders.map(o => ({
            id: o.id,
            stock_name: o.stock.companyname,
            stock_symbol: o.stock.symbol,
            order_type: o.order_type,
            order_price: o.order_price,
            quantity: o.quantity,
            status: o.status,
            created_at: o.created_at
        }));

        res.status(200).json(result);
    } catch (err) {
        console.error('Error fetching user orders:', err);
        res.status(500).json({ message: 'Failed to fetch user orders' });
    }
};
