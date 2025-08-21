import express from 'express';
const router = express.Router();
import { create, list, getUserOrders } from '../controllers/order.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';
router.post('/', authenticate, create);
router.get('/', authenticate, list);
router.get('/myorders', authenticate, getUserOrders);
export default router;