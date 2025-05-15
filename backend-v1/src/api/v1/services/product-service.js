
import Product from '../models/product-model.js';

class ProductService {
  // Create a new product
  async createProduct(productData, userId) {
    // Add seller information
    productData.seller = userId;
    
    // Handle images if provided
    if (productData.images && !Array.isArray(productData.images)) {
      productData.images = [productData.images];
    }
    
    return await Product.create(productData);
  }

  // Get all products with filtering, sorting, pagination
  async getAllProducts(queryParams) {
    const { 
      page = 1, 
      limit = 10, 
      sort = '-createdAt', 
      select,
      category,
      brand,
      minPrice,
      maxPrice,
      search,
      featured,
      inStock
    } = queryParams;
    
    // Build query
    const query = {};
    
    // Filter by category
    if (category) {
      query.category = category;
    }
    
    // Filter by brand
    if (brand) {
      query.brand = brand;
    }
    
    // Filter by price range
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    
    // Search by name or description
    if (search) {
      query.$text = { $search: search };
    }
    
    // Filter by featured status
    if (featured !== undefined) {
      query.featured = featured === 'true';
    }
    
    // Filter by stock status
    if (inStock === 'true') {
      query.stock = { $gt: 0 };
    }
    
    // Only show active products
    query.active = true;
    
    // Execute query
    const skip = (Number(page) - 1) * Number(limit);
    
    const products = await Product.find(query)
      .sort(sort)
      .select(select)
      .skip(skip)
      .limit(Number(limit));
    
    // Get total count for pagination
    const total = await Product.countDocuments(query);
    
    return {
      products,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / Number(limit))
      }
    };
  }

  // Get a single product by ID
  async getProductById(productId) {
    const product = await Product.findById(productId);
    
    if (!product) {
      throw new Error('Product not found');
    }
    
    return product;
  }

  // Update a product
  async updateProduct(productId, updateData, userId) {
    // Find product first to verify ownership
    const product = await Product.findById(productId);
    
    if (!product) {
      throw new Error('Product not found');
    }
    
    // Verify seller is the owner
    if (product.seller.toString() !== userId && process.env.NODE_ENV !== 'development') {
      throw new Error('Not authorized to update this product');
    }
    
    // Handle images if provided
    if (updateData.images && !Array.isArray(updateData.images)) {
      updateData.images = [updateData.images];
    }
    
    // Update the product
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updateData,
      { new: true, runValidators: true }
    );
    
    return updatedProduct;
  }

  // Delete a product
  async deleteProduct(productId, userId) {
    // Find product first to verify ownership
    const product = await Product.findById(productId);
    
    if (!product) {
      throw new Error('Product not found');
    }
    
    // Verify seller is the owner
    if (product.seller.toString() !== userId && process.env.NODE_ENV !== 'development') {
      throw new Error('Not authorized to delete this product');
    }
    
    await Product.findByIdAndDelete(productId);
    
    return { success: true };
  }
}

export default new ProductService();