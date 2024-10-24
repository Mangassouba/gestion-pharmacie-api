import express from 'express';
import {
  createClient,
  getAllClients,
  getClientById,
  updateClient,
  deleteClient,
} from '../controllers/clientController.js';
import { createClientValidator,updateClientValidator,deleteClientValidator,getClientByIdValidator } from '../validators/clientValidator.js';

const clientRouter = express.Router();

clientRouter.post('/clients',createClientValidator, createClient);
clientRouter.get('/clients', getAllClients);
clientRouter.get('/clients/:id', getClientByIdValidator, getClientById);
clientRouter.put('/clients/:id',updateClientValidator, updateClient);
clientRouter.delete('/clients/:id',deleteClientValidator, deleteClient);

export default clientRouter;
