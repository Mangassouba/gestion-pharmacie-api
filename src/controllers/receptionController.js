import prisma from "../config/prisma.js";
import { StatusCodes } from "http-status-codes";

// Create a new reception with details
export const createReception = async (req, res) => {
    const { reception_date, userId, details } = req.body;
  
    try {
      // Create the reception record
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
  
      // Update the stock for each received product
      await Promise.all(
        details.map(async (detail) => {
          await prisma.products.update({
            where: { id: detail.productId },
            data: { stock: { increment: detail.quantity } }, // Increment stock by the received quantity
          });
        })
      );
  
      res.status(StatusCodes.CREATED).json(newReception);
    } catch (error) {
      console.error('Error creating the reception:', error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Error while creating the reception.' });
    }
  };

// Get all receptions
export const getReceptions = async (req, res) => {
  try {
    const receptions = await prisma.receptions.findMany({
      include: { details: true, user: true }
    });
    res.status(StatusCodes.OK).json(receptions);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

// Get a reception by ID
export const getReceptionById = async (req, res) => {
  const { id } = req.params;
  try {
    const reception = await prisma.receptions.findUnique({
      where: { id: Number(id) },
      include: { details: true, user: true }
    });
    if (!reception) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: "Reception not found" });
    }
    res.status(StatusCodes.OK).json(reception);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

// Update a reception and its details
export const updateReception = async (req, res) => {
  const { id } = req.params;
  const { reception_date, userId, details } = req.body;

  try {
    const receptionExists = await prisma.receptions.findUnique({
      where: { id: Number(id) },
      include: { details: true }
    });

    if (!receptionExists) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: "Reception not found" });
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
            product: { connect: { id: detail.productId } }
          }))
        }
      }
    });

    res.status(StatusCodes.OK).json(updatedReception);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

// Delete a reception
export const deleteReception = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.receptions.delete({
      where: { id: Number(id) }
    });
    res.status(StatusCodes.OK).json({ message: "Reception successfully deleted" });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};
