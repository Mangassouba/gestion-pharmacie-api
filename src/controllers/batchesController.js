import { PrismaClient } from '@prisma/client';
// import i18next from '../i18n.js'; 
const prisma = new PrismaClient();
import { StatusCodes } from "http-status-codes";

// Create a new batch
export const createBatch = async (req, res) => {
  const userId = req.user.id; 
  const { number, quantity, expiration_date, productId } = req.body;

  try {
    const newBatch = await prisma.batches.create({
      data: {
        number,
        quantity,
        expiration_date: new Date(expiration_date),
        productId,
        userId, 
      },
    });
    res.status(StatusCodes.CREATED).json(newBatch);
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};


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


export const updateBatch = async (req, res) => {
  const userId = req.user.id;
  console.log(userId);
   
  const { id } = req.params;
  const { number, quantity, expiration_date, productId } = req.body;

  try {
    const updatedBatch = await prisma.batches.update({
      where: { id: Number(id) },
      data: {
        number,
        quantity,
        expiration_date: new Date(expiration_date),
        productId,
        userId,
      },
    });
    res.status(StatusCodes.OK).json(updatedBatch);
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

export const deleteBatch = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;

  try {
    await prisma.batches.update({
      where: { id: Number(id) },
      data: { deletedBy: userId },
    });

    await prisma.batches.delete({
      where: { id: Number(id) },
    });

    res.status(StatusCodes.OK).json({ message: "Batch successfully deleted" });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};
