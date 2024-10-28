import express from 'express';
import { authenticateToken,authorizeRole } from '../middlewares/authMiddleware.js';
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
import { addProductValidator,getProductByIdValidator,updateProductValidator,deleteProductValidator } from '../validators/productValidator.js';

const productRoute = express.Router();

productRoute.post('/product', authenticateToken, addProductValidator, createProduct);
productRoute.get('/products', authenticateToken, getAllProducts);
productRoute.get('/product/:id',authenticateToken, getProductByIdValidator, getProductById);
productRoute.put('/product/:id',authenticateToken, updateProductValidator, updateProduct);
productRoute.delete('/product/:id',authenticateToken, authorizeRole('ADMIN'), deleteProductValidator, deleteProduct);

export default productRoute;
