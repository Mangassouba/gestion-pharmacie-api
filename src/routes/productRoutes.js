import express from 'express';
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
import { addProductValidator,getProductByIdValidator,updateProductValidator,deleteProductValidator } from '../validators/productValidator.js';

const productRoute = express.Router();

// Routes pour gérer les produits
productRoute.post('/product',addProductValidator, createProduct);
productRoute.get('/products', getAllProducts);
productRoute.get('/product/:id',getProductByIdValidator, getProductById);
productRoute.put('/product/:id',updateProductValidator, updateProduct);
productRoute.delete('/product/:id',deleteProductValidator, deleteProduct);

export default productRoute;
