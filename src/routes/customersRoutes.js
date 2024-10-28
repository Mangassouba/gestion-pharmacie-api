import express from 'express';
import {
  createClient,
  getAllClients,
  getClientById,
  updateClient,
  deleteClient,
} from '../controllers/customersController.js';
import { authenticateToken,authorizeRole } from '../middlewares/authMiddleware.js';
import { createClientValidator,updateClientValidator,deleteClientValidator,getClientByIdValidator } from '../validators/customersValidator.js';

const clientRouter = express.Router();

clientRouter.post('/customers', authenticateToken, createClientValidator, createClient);
clientRouter.get('/customers', authenticateToken, getAllClients);
clientRouter.get('/customers/:id', authenticateToken, getClientByIdValidator, getClientById);
clientRouter.put('/customers/:id', authenticateToken, updateClientValidator, updateClient);
clientRouter.delete('/customers/:id', authenticateToken, authorizeRole, deleteClientValidator, deleteClient);

export default clientRouter;
