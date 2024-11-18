import { PrismaClient } from '@prisma/client';
import i18next from '../i18n.js'; 
const prisma = new PrismaClient();

export const createOrder = async (req, res) => {
    const userId = req.user.userId;
    try {
      const { order_date, customerId, detailsOrder } = req.body;
  
      const customerExists = await prisma.customers.findUnique({
        where: { id: customerId },
      });
  
      if (!customerExists) {
        return res.status(404).json({ error: i18next.t('order.customerNotFound') });
      }
  
      for (const detail of detailsOrder) {
        const productExists = await prisma.products.findUnique({
          where: { id: detail.productId },
        });
  
        if (!productExists) {
          return res.status(404).json({
            error: i18next.t('order.productNotFound', { productId: detail.productId }),
          });
        }
      }
  
      const newOrder = await prisma.orders.create({
        data: {
          order_date,
          customerId,
          userId,
          details: {
            create: detailsOrder.map((detail) => ({
              quantity: detail.quantity,
              price: detail.price,
              product: { connect: { id: detail.productId } },
            })),
          },
        },
      });
  
      res.status(201).json(newOrder);
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(400).json({ error: i18next.t('order.creationError') });
    }
};

export const getOrders = async (req, res) => {
    try {
      const orders = await prisma.orders.findMany({
        include: {
          details: true,
          customer: true,
        },
        orderBy: { id: 'asc' }
      });
      res.status(200).json(orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(400).json({
        error: i18next.t('order.fetchAllError', { message: error.message }),
      });
    }
};

export const getOrderById = async (req, res) => {
    const { id } = req.params;
    try {
      const order = await prisma.orders.findUnique({
        where: { id: Number(id) },
        include: {
          details: true,
          customer: true,
        },
      });
  
      if (!order) {
        return res.status(404).json({ error: i18next.t('order.notFound') });
      }
  
      res.status(200).json(order);
    } catch (error) {
      console.error('Error fetching the order:', error);
      res.status(400).json({
        error: i18next.t('order.fetchError', { message: error.message }),
      });
    }
};

export const updateOrder = async (req, res) => {
    const userId = req.user.userId;
    const { id } = req.params;
    const { status, order_date, customerId, detailsOrder } = req.body;
  
    try {
      const orderExists = await prisma.orders.findUnique({
        where: { id: Number(id) },
        include: { details: true },
      });
  
      if (!orderExists) {
        return res.status(404).json({ error: i18next.t('order.notFound') });
      }
  
      const customerExists = await prisma.customers.findUnique({
        where: { id: customerId },
      });
  
      if (!customerExists) {
        return res.status(404).json({ error: i18next.t('order.customerNotFound') });
      }
  
      for (const detail of detailsOrder) {
        const productExists = await prisma.products.findUnique({
          where: { id: detail.productId },
        });
  
        if (!productExists) {
          return res.status(404).json({
            error: i18next.t('order.productNotFound', { productId: detail.productId }),
          });
        }
      }
  
      const updatedOrder = await prisma.orders.update({
        where: { id: Number(id) },
        data: {
          status: status || orderExists.status,
          order_date,
          customer: { connect: { id: customerId } },
          user: { connect: { id: userId } },
          details: {
            deleteMany: {}, 
            create: detailsOrder.map((detail) => ({
              quantity: detail.quantity,
              price: detail.price,
              product: { connect: { id: detail.productId } },
            })),
          },
        },
      });
  
      res.status(200).json(updatedOrder);
    } catch (error) {
      console.error('Error updating the order:', error);
      res.status(400).json({
        error: i18next.t('order.updateError', { message: error.message }),
      });
    }
};

export const deleteOrder = async (req, res) => {
    const userId = req.user.userId;
    const { id } = req.params;
  
    try {
      const existingOrder = await prisma.orders.findUnique({
        where: { id: Number(id) },
      });
  
      if (!existingOrder) {
        return res.status(404).json({ error: i18next.t('order.notFound') });
      }
  
      await prisma.orders.delete({
        where: { id: Number(id) },
      });
  
      res.status(200).json({ message: i18next.t('order.deletionSuccess') });
    } catch (error) {
      console.error('Error deleting the order:', error);
      res.status(400).json({
        error: i18next.t('order.deletionError', { message: error.message }),
      });
    }
};