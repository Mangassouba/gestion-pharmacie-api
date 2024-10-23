import express from 'express';
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';

const productRoute = express.Router();

// Routes pour gérer les produits
productRoute.post('/product', createProduct);
productRoute.get('/products', getAllProducts);
productRoute.get('/product/:id', getProductById);
productRoute.put('/product/:id', updateProduct);
productRoute.delete('/product/:id', deleteProduct);

export default productRoute;
