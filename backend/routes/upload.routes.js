import express from 'express';
import multer from 'multer';
const router = express.Router();
const storage = multer.diskStorage(
{
  destination: function (req, file, cb) 
  {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) 
  {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });
router.post('/upload', upload.single('file'), (req, res) => 
{
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
  return res.status(200).json({ message: 'File uploaded successfully', file: req.file });
});
export default router;