import express from 'express';
import {
  createClient,
  getAllClients,
  getClientById,
  updateClient,
  deleteClient,
} from '../controllers/clientController.js';

const clientRouter = express.Router();

clientRouter.post('/clients', createClient);
clientRouter.get('/clients', getAllClients);
clientRouter.get('/clients/:id', getClientById);
clientRouter.put('/clients/:id', updateClient);
clientRouter.delete('/clients/:id', deleteClient);

export default clientRouter;
