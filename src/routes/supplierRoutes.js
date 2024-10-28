import express from 'express';
import {
  getAllSuppliers,
  getSupplierById,
  createSupplier,
  updateSupplier,
  deleteSupplier,
} from '../controllers/supplierController.js';
import {
  createSupplierValidator,
  updateSupplierValidator,
  deleteSupplierValidator,
  getSupplierByIdValidator,
} from '../validators/supplierValidator.js';
import { authenticateToken,authorizeRole } from '../middlewares/authMiddleware.js';

const supplierRouter = express.Router();

supplierRouter.post('/suppliers', authenticateToken, createSupplierValidator, createSupplier);
supplierRouter.get('/suppliers', authenticateToken, getAllSuppliers);
supplierRouter.get('/suppliers/:id', authenticateToken, getSupplierByIdValidator, getSupplierById);
supplierRouter.put('/suppliers/:id', authenticateToken, updateSupplierValidator, updateSupplier);
supplierRouter.delete('/suppliers/:id', authenticateToken, authorizeRole, deleteSupplierValidator, deleteSupplier);

export default supplierRouter;
