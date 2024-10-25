import prisma from "../config/prisma.js";
import { StatusCodes } from "http-status-codes";

export const createStockMovement = async (req, res) => {
  try {
    const { quantity, movement_date, type, productId } = req.body;

    const newStockMovement = await prisma.stockMovements.create({
      data: {
        quantity,
        movement_date,
        type,
        product: { connect: { id: productId } }
      },
    });

    res.status(StatusCodes.CREATED).json(newStockMovement);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

export const getStockMovements = async (req, res) => {
  try {
    const movements = await prisma.stockMovements.findMany({
      include: { product: true },
    });
    res.status(StatusCodes.OK).json(movements);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

export const getStockMovementById = async (req, res) => {
  const { id } = req.params;
  try {
    const movement = await prisma.stockMovements.findUnique({
      where: { id: Number(id) },
      include: { product: true },
    });

    if (!movement) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: "Stock movement not found" });
    }

    res.status(StatusCodes.OK).json(movement);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

export const updateStockMovement = async (req, res) => {
  const { id } = req.params;
  const { quantity, movement_date, type, productId } = req.body;

  try {
    const movementExists = await prisma.stockMovements.findUnique({ where: { id: Number(id) } });

    if (!movementExists) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: "Stock movement not found" });
    }

    const updatedMovement = await prisma.stockMovements.update({
      where: { id: Number(id) },
      data: { quantity, movement_date, type, productId },
    });

    res.status(StatusCodes.OK).json(updatedMovement);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

export const deleteStockMovement = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.stockMovements.delete({ where: { id: Number(id) } });
    res.status(StatusCodes.OK).json({ message: "Stock movement successfully deleted" });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};
