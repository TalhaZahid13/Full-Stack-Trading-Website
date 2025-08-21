import Portfolio from '../models/portfolio.model.js';
export const getAllPortfolios = async (req, res) => 
{
  try 
  {
    const userid = req.user.id;
    const portfolio = await Portfolio.findAll({ where: { userid } });
    let totalInvested = 0;
    let totalMarketValue = 0;
    let totalPL = 0;
    const formattedPortfolio = portfolio.map(p => 
    {
      const qty = parseFloat(p.qty) || 0;
      const avgBuyPrice = parseFloat(p.avgBuyPrice) || 0;
      const currentPrice = parseFloat(p.currentPrice) || 0;
      const marketValue = parseFloat(p.marketValue) || 0;
      const unrealizedPL = parseFloat(p.unrealizedPL) || 0;
      totalInvested += qty * avgBuyPrice;
      totalMarketValue += marketValue;
      totalPL += unrealizedPL;
      return {
        id: p.id,
        symbol: p.symbol,
        qty,
        avgBuyPrice,
        currentPrice,
        marketValue,
        unrealizedPL,
      };
    });
    res.json({
      portfolio: formattedPortfolio,
      summary: 
      {
        totalInvested,
        totalMarketValue,
        totalPL,
      },
    });
  } 
  catch (err) 
  {
    console.error('Fetch Error:', err);
    res.status(500).json({ error: 'Server Error: Unable to fetch portfolio.' });
  }
};