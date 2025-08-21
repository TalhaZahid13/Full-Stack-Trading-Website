import express from 'express';
import { authenticate } from '../middleware/auth.middleware.js';
import verifyToken from '../middleware/portfolio.middleware.js';
const router = express.Router();
import 
{ 
    getAllPortfolios 
} from '../controllers/portfolio.controller.js';
router.get('/', verifyToken, authenticate, getAllPortfolios);
export default router;