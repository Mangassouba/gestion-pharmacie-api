import prisma from "../config/prisma.js";
import { StatusCodes } from "http-status-codes";

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

export const createSale = async (req, res) => {
    const { sale_date, userId, details } = req.body;
  
    try {
      for (const detail of details) {
        const product = await prisma.products.findUnique({
          where: { id: detail.productId },
        });
  
        if (!product || product.stock < detail.quantity) {
          return res.status(StatusCodes.BAD_REQUEST).json({ error: `Insufficient stock for product ID ${detail.productId}` });
        }
      }
  
      const newSale = await prisma.sales.create({
        data: {
          sale_date,
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
            data: { stock: { decrement: detail.quantity } },
          });
          await logStockMovement(detail.productId, -detail.quantity, 'sale');
        })
      );
  
      res.status(StatusCodes.CREATED).json(newSale);
    } catch (error) {
      console.error('Error creating the sale:', error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Error while creating the sale.' });
    }
  }; 

export const getSales = async (req, res) => {
  try {
    const sales = await prisma.sales.findMany({
      include: { details: true, user: true },
    });
    res.status(StatusCodes.OK).json(sales);
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

export const getSaleById = async (req, res) => {
  const { id } = req.params;
  try {
    const sale = await prisma.sales.findUnique({
      where: { id: Number(id) },
      include: { details: true, user: true },
    });
    if (!sale) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: "Sale not found" });
    }
    res.status(StatusCodes.OK).json(sale);
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

export const updateSale = async (req, res) => {
  const { id } = req.params;
  const { sale_date, userId, details } = req.body;

  try {
    const saleExists = await prisma.sales.findUnique({
      where: { id: Number(id) },
    });
    if (!saleExists) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: "Sale not found" });
    }

    if (userId) {
      const userExists = await prisma.users.findUnique({ where: { id: userId } });
      if (!userExists) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: "User not found" });
      }
    }

    const updatedSale = await prisma.$transaction(async (prisma) => {

      await prisma.saleDetails.deleteMany({
        where: { saleId: Number(id) },
      });

      return prisma.sales.update({
        where: { id: Number(id) },
        data: {
          sale_date,
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
    });

    res.status(StatusCodes.OK).json(updatedSale);
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

export const deleteSale = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.sales.delete({
      where: { id: Number(id) },
    });
    res.status(StatusCodes.OK).json({ message: "Sale successfully deleted" });
  } catch (error) {
    console.log(error);
    if (error.code === "P2003") {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: "Cannot delete sale due to existing references",
      });
    }
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};
