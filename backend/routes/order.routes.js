import express from 'express';
import auth from '../middleware/auth.middleware.js';
import * as ctrl from '../controllers/order.controller.js';
const router = express.Router();
router.post('/', auth, ctrl.create);
router.get('/', auth, ctrl.list);
export default router;
