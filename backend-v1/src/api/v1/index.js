import express from 'express';
import productRoutes from './routes/product-route.js';

const router = express.Router();

// Health check for API v1
router.get('/health', (req, res) => {
    res.status(200).json({ 
      status: 'success', 
      message: 'API v1 is working properly' 
    });
  });

router.use('/products', productRoutes);
// all routes path maintain here for api version1 
export default router;