// src/api/v1/routes/product-routes.js
import express from 'express';
import productController from '../controllers/product-controller.js';
import validate from '../middlewares/validate.js';
import { productValidationSchema } from '../../../utils/validations/product-validator.js';


const router = express.Router();

// Public routes
router.get('/', productController.getAllProducts);
router.get('/:id', validate(productValidationSchema.productId), productController.getProductById);

// Protected routes - require authentication
router.post(
  '/', 

  validate(productValidationSchema.create), 
  productController.createProduct
);

router.put(
  '/:id', 

  validate(productValidationSchema.productId),
  validate(productValidationSchema.update), 
  productController.updateProduct
);

router.delete(
  '/:id', 

  validate(productValidationSchema.productId), 
  productController.deleteProduct
);

export default router;