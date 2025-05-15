// src/api/v1/controllers/product-controller.js
import productService from '../services/product-service.js';

class ProductController {
  // Create a new product
  async createProduct(req, res, next) {
    try {
      // Assuming req.user contains the authenticated user info
      const userId = req.user?.id || '65f9b2c75c88e10b3c5df9f0'; // For development only
      
      const product = await productService.createProduct(req.body, userId);
      
      res.status(201).json({
        success: true,
        data: product
      });
    } catch (error) {
      next(error);
    }
  }

  // Get all products
  async getAllProducts(req, res, next) {
    try {
      const result = await productService.getAllProducts(req.query);
      
      res.status(200).json({
        success: true,
        ...result.pagination,
        data: result.products
      });
    } catch (error) {
      next(error);
    }
  }

  // Get product by ID
  async getProductById(req, res, next) {
    try {
      const product = await productService.getProductById(req.params.id);
      
      res.status(200).json({
        success: true,
        data: product
      });
    } catch (error) {
      next(error);
    }
  }

  // Update product
  async updateProduct(req, res, next) {
    try {
      // Assuming req.user contains the authenticated user info
      const userId = req.user?.id || '65f9b2c75c88e10b3c5df9f0'; // For development only
      
      const product = await productService.updateProduct(
        req.params.id, 
        req.body,
        userId
      );
      
      res.status(200).json({
        success: true,
        data: product
      });
    } catch (error) {
      next(error);
    }
  }

  // Delete product
  async deleteProduct(req, res, next) {
    try {
      // Assuming req.user contains the authenticated user info
      const userId = req.user?.id || '65f9b2c75c88e10b3c5df9f0'; // For development only
      
      await productService.deleteProduct(req.params.id, userId);
      
      res.status(200).json({
        success: true,
        message: 'Product deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new ProductController();