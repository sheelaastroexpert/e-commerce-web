// src/api/v1/utils/validation-schemas.js
import Joi from 'joi';

export const productValidationSchema = {
  create: Joi.object({
    name: Joi.string().required().max(100).trim()
      .messages({
        'string.empty': 'Product name is required',
        'string.max': 'Product name cannot exceed 100 characters'
      }),
    description: Joi.string().required().max(2000)
      .messages({
        'string.empty': 'Product description is required',
        'string.max': 'Product description cannot exceed 2000 characters'
      }),
    price: Joi.number().required().min(0).max(99999999)
      .messages({
        'number.base': 'Price must be a number',
        'number.min': 'Price cannot be negative',
        'number.max': 'Price is too high'
      }),
    discountPercentage: Joi.number().min(0).max(99).default(0)
      .messages({
        'number.min': 'Discount cannot be negative',
        'number.max': 'Discount percentage cannot exceed 99%'
      }),
    stock: Joi.number().required().min(0).integer()
      .messages({
        'number.base': 'Stock must be a number',
        'number.min': 'Stock cannot be negative',
        'number.integer': 'Stock must be a whole number'
      }),
    category: Joi.string().required().valid(
      'Electronics', 'Clothing', 'Furniture', 'Books', 
      'Toys', 'Food', 'Sports', 'Beauty', 'Health', 'Other'
    ).messages({
      'any.only': 'Please select a valid category'
    }),
    brand: Joi.string().required()
      .messages({
        'string.empty': 'Brand is required'
      }),
    featured: Joi.boolean().default(false),
    active: Joi.boolean().default(true)
  }),
  
  update: Joi.object({
    name: Joi.string().max(100).trim()
      .messages({
        'string.max': 'Product name cannot exceed 100 characters'
      }),
    description: Joi.string().max(2000)
      .messages({
        'string.max': 'Product description cannot exceed 2000 characters'
      }),
    price: Joi.number().min(0).max(99999999)
      .messages({
        'number.base': 'Price must be a number',
        'number.min': 'Price cannot be negative',
        'number.max': 'Price is too high'
      }),
    discountPercentage: Joi.number().min(0).max(99)
      .messages({
        'number.min': 'Discount cannot be negative',
        'number.max': 'Discount percentage cannot exceed 99%'
      }),
    stock: Joi.number().min(0).integer()
      .messages({
        'number.base': 'Stock must be a number',
        'number.min': 'Stock cannot be negative',
        'number.integer': 'Stock must be a whole number'
      }),
    category: Joi.string().valid(
      'Electronics', 'Clothing', 'Furniture', 'Books', 
      'Toys', 'Food', 'Sports', 'Beauty', 'Health', 'Other'
    ).messages({
      'any.only': 'Please select a valid category'
    }),
    brand: Joi.string(),
    featured: Joi.boolean(),
    active: Joi.boolean()
  }).min(1).messages({
    'object.min': 'Please provide at least one field to update'
  }),
  
  productId: Joi.object({
    id: Joi.string().required().pattern(/^[0-9a-fA-F]{24}$/)
      .messages({
        'string.empty': 'Product ID is required',
        'string.pattern.base': 'Invalid product ID format'
      })
  })
};