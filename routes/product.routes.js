import express from 'express';
const router = express.Router();
import productController from '../controllers/product.controller.js';
import rateLimit from '../middlewares/rateLimit.js';
import authenticateToken from '../middlewares/authToken.js';
const { getProducts, getProduct, createProducts, updateProduct, deleteProduct } = productController;


//Get Products
router.get('/',rateLimit({ maxRequests: 5, windowMs: 60000 }), authenticateToken , getProducts);

//Get Product
router.get('/:id', getProduct);

// Create Product
router.post('/', createProducts);

// Update Product
router.patch('/:id', updateProduct);

//Delete Product
router.delete('/:id', deleteProduct);

export default router;