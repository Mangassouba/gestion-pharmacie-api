
import express from 'express';
import { createOrder, getOrders, getOrderById, updateOrder, deleteOrder } from '../controllers/ordersController.js';
import { createOrderValidator, deleteOrderValidator, updateOrderValidator, getOrderByIdValidator } from '../validators/ordersValidator.js';
import { authenticateToken,authorizeRole } from '../middlewares/authMiddleware.js';

const ordersRouter = express.Router();


ordersRouter.post('/orders', authenticateToken, createOrderValidator, createOrder);
ordersRouter.get('/orders', authenticateToken, getOrders);
ordersRouter.get('/orders', authenticateToken, getOrderByIdValidator, getOrderById);
ordersRouter.put('/orders/:id', authenticateToken, updateOrderValidator, updateOrder);
ordersRouter.delete('/orders/:id', authenticateToken, authorizeRole('ADMIN'), deleteOrderValidator, deleteOrder);

export default ordersRouter;
