import express from 'express';
import {
  createClient,
  getAllClients,
  getClientById,
  updateClient,
  deleteClient,
} from '../controllers/customersController.js';
import { createClientValidator,updateClientValidator,deleteClientValidator,getClientByIdValidator } from '../validators/customersValidator.js';

const clientRouter = express.Router();

clientRouter.post('/customers',createClientValidator, createClient);
clientRouter.get('/customers', getAllClients);
clientRouter.get('/customers/:id', getClientByIdValidator, getClientById);
clientRouter.put('/customers/:id',updateClientValidator, updateClient);
clientRouter.delete('/customers/:id',deleteClientValidator, deleteClient);

export default clientRouter;
