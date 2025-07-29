import Customer from '../models/customer.model.js';
export const create = async (req, res) => 
{
    try 
    {
        const customer = await Customer.create(req.body);
        return res.status(201).json(customer);
    }
    catch (err) 
    {
        return res.status(400).json({ error: err.message });
    }
};
export const list = async (req, res) => 
{
    try 
    {
        const customers = await Customer.findAll();
        return res.json(customers);
    } 
    catch (err) 
    {
        return res.status(500).json({ error: err.message });
    }
};