import prisma from "../config/prisma.js";
import { StatusCodes } from "http-status-codes";

// Create a new batch
export const createBatch = async (req, res) => {
  try {
    const { batch_number, quantity, expiration_date, productId } = req.body;
    const newBatch = await prisma.batches.create({
      data: {
        batch_number,
        quantity,
        expiration_date: new Date(expiration_date),
        productId,
      },
    });
    res.status(StatusCodes.CREATED).json(newBatch);
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

// Get all batches
export const getBatches = async (req, res) => {
  try {
    const batches = await prisma.batches.findMany({
      include: { product: true },
    });
    res.status(StatusCodes.OK).json(batches);
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

// Get a batch by ID
export const getBatchById = async (req, res) => {
  const { id } = req.params;
  try {
    const batch = await prisma.batches.findUnique({
      where: { id: Number(id) },
      include: { product: true },
    });
    if (!batch) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: "Batch not found" });
    }
    res.status(StatusCodes.OK).json(batch);
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

// Update a batch
export const updateBatch = async (req, res) => {
  const { id } = req.params;
  const { batch_number, quantity, expiration_date, productId } = req.body;

  try {
    const updatedBatch = await prisma.batches.update({
      where: { id: Number(id) },
      data: {
        batch_number,
        quantity,
        expiration_date: new Date(expiration_date),
        productId,
      },
    });
    res.status(StatusCodes.OK).json(updatedBatch);
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

// Delete a batch
export const deleteBatch = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.batches.delete({
      where: { id: Number(id) },
    });
    res.status(StatusCodes.OK).json({ message: "Batch successfully deleted" });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};
