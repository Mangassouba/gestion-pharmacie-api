
import express from 'express';
import { createOrder, getOrders, getOrderById, updateOrder, deleteOrder } from '../controllers/ordersController.js';
import { createOrderValidator, deleteOrderValidator, updateOrderValidator, getOrderByIdValidator } from '../validators/ordersValidator.js';

const ordersRouter = express.Router();


ordersRouter.post('/orders',createOrderValidator, createOrder);
ordersRouter.get('/orders', getOrders);
ordersRouter.get('/orders',getOrderByIdValidator, getOrderById);
ordersRouter.put('/orders/:id',updateOrderValidator, updateOrder);
ordersRouter.delete('/orders/:id',deleteOrderValidator, deleteOrder);

export default ordersRouter;
