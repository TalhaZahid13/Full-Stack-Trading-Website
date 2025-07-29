// controllers/portfolio.controller.js

import Portfolio from '../models/portfolio.model.js'; // Note `.js` extension for ES import

export async function create(req, res) {
  try {
    const portfolio = await Portfolio.create(req.body);
    return res.status(201).json(portfolio);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}

export async function list(req, res) {
  try {
    const portfolios = await Portfolio.findAll();
    return res.json(portfolios);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
