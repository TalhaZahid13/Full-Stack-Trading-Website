import express from 'express';
import multer from 'multer';
import * as ctrl from '../controllers/stock.controller.js';
const router = express.Router();
const upload = multer({ dest: 'uploads/' });
router.get('/', ctrl.list);
router.post('/upload', upload.single('file'), ctrl.uploadCSV);
export default router;
