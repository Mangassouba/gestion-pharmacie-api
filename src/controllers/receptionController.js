import prisma from "../config/prisma.js";
import { StatusCodes } from "http-status-codes";
import i18next from '../i18n.js';

const logStockMovement = async (productId, quantity, type) => {
  await prisma.stockMovements.create({
    data: {
      quantity,
      movement_date: new Date(),
      type,
      productId,
    },
  });
};

export const createReception = async (req, res) => {
    const { reception_date, details } = req.body;
    const userId = req.user.userId;
    try {
      const newReception = await prisma.receptions.create({
        data: {
          reception_date,
          userId,
          details: {
            create: details.map((detail) => ({
              quantity: detail.quantity,
              price: detail.price,
              product: { connect: { id: detail.productId } },
            })),
          },
        },
      });
  
      await Promise.all(
        details.map(async (detail) => {
          await prisma.products.update({
            where: { id: detail.productId },
            data: { stock: { increment: detail.quantity } },
          });
  
          await logStockMovement(detail.productId, detail.quantity, 'reception');
        })
      );
  
      res.status(StatusCodes.CREATED).json(newReception);
    } catch (error) {
      console.error('Error creating the reception:', error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: i18next.t('reception.creationError') });
    }
  };

export const getReceptions = async (req, res) => {
  try {
    const receptions = await prisma.receptions.findMany({
      include: { details: true, user: true },
      orderBy: { id: 'asc' }
    });
    res.status(StatusCodes.OK).json(receptions);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: i18next.t('reception.fetchAllError', { message: error.message }) });
  }
};

export const getReceptionById = async (req, res) => {
  const { id } = req.params;
  try {
    const reception = await prisma.receptions.findUnique({
      where: { id: Number(id) },
      include: { details: true, user: true },
    });
    if (!reception) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: i18next.t('reception.notFound') });
    }
    res.status(StatusCodes.OK).json(reception);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: i18next.t('reception.fetchError', { message: error.message }) });
  }
};

export const updateReception = async (req, res) => {
    const { id } = req.params;
    const { reception_date, details } = req.body;
  
    try {
      const receptionExists = await prisma.receptions.findUnique({
        where: { id: Number(id) },
        include: { details: true },
      });
  
      if (!receptionExists) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: i18next.t('reception.notFound') });
      }
  
      const updatedReception = await prisma.receptions.update({
        where: { id: Number(id) },
        data: {
          reception_date,
          userId,
          details: {
            deleteMany: {},
            create: details.map(detail => ({
              quantity: detail.quantity,
              price: detail.price,
              product: { connect: { id: detail.productId } },
            })),
          },
        },
      });
  
      await Promise.all(
        details.map(async (detail) => {
          await prisma.products.update({
            where: { id: detail.productId },
            data: { stock: { increment: detail.quantity } },
          });
          await logStockMovement(detail.productId, detail.quantity, 'reception');
        })
      );
  
      res.status(StatusCodes.OK).json(updatedReception);
    } catch (error) {
      console.error('Error updating the reception:', error);
      res.status(StatusCodes.BAD_REQUEST).json({ error: i18next.t('reception.updateError', { message: error.message }) });
    }
  };
  

  export const deleteReception = async (req, res) => {
    const { id } = req.params;
  
    try {
      const reception = await prisma.receptions.findUnique({
        where: { id: Number(id) },
        include: { details: true },
      });
  
      if (!reception) {
        return res.status(StatusCodes.NOT_FOUND).json({
          error: i18next.t('reception.notFound'),
        });
      }
      await Promise.all(
        reception.details.map(async (detail) => {
          await prisma.products.update({
            where: { id: detail.productId },
            data: { stock: { decrement: detail.quantity } },
          });
          await logStockMovement(detail.productId, -detail.quantity, 'reception deletion');
        })
      );
      await prisma.receptions.delete({
        where: { id: Number(id) },
      });
  
      res.status(StatusCodes.OK).json({
        message: i18next.t('reception.deletionSuccess'),
      });
    } catch (error) {
      console.error(error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: i18next.t('reception.deletionError', { message: error.message }),
      });
    }
  };
