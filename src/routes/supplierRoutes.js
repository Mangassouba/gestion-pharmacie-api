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

const supplierRouter = express.Router();

supplierRouter.post('/suppliers', createSupplierValidator, createSupplier);
supplierRouter.get('/suppliers', getAllSuppliers);
supplierRouter.get('/suppliers/:id', getSupplierByIdValidator, getSupplierById);
supplierRouter.put('/suppliers/:id', updateSupplierValidator, updateSupplier);
supplierRouter.delete('/suppliers/:id', deleteSupplierValidator, deleteSupplier);

export default supplierRouter;
