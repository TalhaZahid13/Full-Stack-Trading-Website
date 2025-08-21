import express from 'express';
import multer from 'multer';
import { uploadCsvStock, getAllStocks} from '../controllers/stock.controller.js';
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });
router.post('/upload', upload.single('file'), uploadCsvStock);
router.get('/', getAllStocks);                          
export default router;