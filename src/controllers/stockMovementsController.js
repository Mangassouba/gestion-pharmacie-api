import prisma from "../config/prisma.js";
import { StatusCodes } from "http-status-codes";
import i18next from '../i18n.js';

export const createStockMovement = async (req, res) => {
    try {
      const { quantity, movement_date, type, productId } = req.body;
      const userId = req.user.userId;
  
      const newStockMovement = await prisma.stockMovements.create({
        data: {
          quantity,
          movement_date,
          type,
          product: { connect: { id: productId } },
          user: { connect: { id: userId } }
        },
      });
  
      res.status(StatusCodes.CREATED).json(newStockMovement);
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: i18next.t('stockMovement.creationError', { message: error.message }) });
    }
  };
  
  export const getStockMovements = async (req, res) => {
    try {
      const movements = await prisma.stockMovements.findMany({
        include: { product: true, user: true },
        orderBy: { id: 'asc' }
      });
      res.status(StatusCodes.OK).json(movements);
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: i18next.t('stockMovement.fetchAllError', { message: error.message }) });
    }
  };
  
  export const getStockMovementById = async (req, res) => {
    const { id } = req.params;
    try {
      const movement = await prisma.stockMovements.findUnique({
        where: { id: Number(id) },
        include: { product: true, user: true },
      });
  
      if (!movement) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: i18next.t('stockMovement.notFound') });
      }
  
      res.status(StatusCodes.OK).json(movement);
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: i18next.t('stockMovement.fetchError', { message: error.message }) });
    }
  };
  
  export const updateStockMovement = async (req, res) => {
    const { id } = req.params;
    const { quantity, movement_date, type, productId } = req.body;
    const userId = req.user.userId;
  
    try {
      const movementExists = await prisma.stockMovements.findUnique({ where: { id: Number(id) } });
  
      if (!movementExists) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: i18next.t('stockMovement.notFound') });
      }
  
      const updatedMovement = await prisma.stockMovements.update({
        where: { id: Number(id) },
        data: { quantity, movement_date, type, productId, userId },
      });
  
      res.status(StatusCodes.OK).json(updatedMovement);
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: i18next.t('stockMovement.updateError', { message: error.message }) });
    }
  };
  
  export const deleteStockMovement = async (req, res) => {
    const { id } = req.params;
    try {
      await prisma.stockMovements.delete({ where: { id: Number(id) } });
      res.status(StatusCodes.OK).json({ message: i18next.t('stockMovement.deletionSuccess') });
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: i18next.t('stockMovement.deletionError', { message: error.message }) });
    }
  };