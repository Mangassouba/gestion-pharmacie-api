import { PrismaClient } from '@prisma/client';
import cron from 'node-cron';
// import i18next from '../i18n.js'; 
const prisma = new PrismaClient();
import { StatusCodes } from "http-status-codes";
// import { sendExpirationAlert } from '../services/emailService.js';
import { processBatchExpirationAlerts } from '../services/batchService.js';

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
      orderBy: { id: 'asc' },
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

// Fonction pour vérifier les lots proches de la péremption
export const checkExpiringBatches = async () => {
  const today = new Date();
  const oneMonthAhead = new Date();
  oneMonthAhead.setMonth(today.getMonth() + 1); // Un mois
  const twoMonthsAhead = new Date();
  twoMonthsAhead.setMonth(today.getMonth() + 2); // Deux mois

  try {
    const expiringBatches = await prisma.batches.findMany({
      where: {
        expiration_date: {
          gte: today,
          lte: twoMonthsAhead, // Lots expirant dans 2 mois
        },
      },
      include: { product: true }, // Inclure les informations sur le produit
    });

    return expiringBatches;
  } catch (error) {
    console.error("Erreur lors de la vérification des lots expirants", error);
    throw error;
  }
};

export const handleBatchExpirationCheck = async (req, res) => {
  try {
    const result = await processBatchExpirationAlerts();
    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

cron.schedule('00 11 * * *', async () => {
  console.log("Exécution du job de vérification des lots proches de la péremption...");
  await handleBatchExpirationCheck();
});