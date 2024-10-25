
import express from 'express';
import { createOrder, getOrders, getOrderById, updateOrder, deleteOrder } from '../controllers/ordersController.js';

const ordersRouter = express.Router();


ordersRouter.post('/orders', createOrder);
ordersRouter.get('/orders', getOrders);
ordersRouter.get('/orders', getOrderById);
ordersRouter.put('/orders/:id', updateOrder);
ordersRouter.delete('/orders/:id', deleteOrder);

export default ordersRouter;
