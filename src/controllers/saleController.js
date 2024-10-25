import prisma from "../config/prisma.js";
import { StatusCodes } from "http-status-codes";

export const createSale = async (req, res) => {
  try {
    const { sale_date, userId, details } = req.body;

    // Validate user existence
    const userExists = await prisma.users.findUnique({ where: { id: userId } });
    if (!userExists) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: "User not found" });
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

    res.status(StatusCodes.CREATED).json(newSale);
  } catch (error) {
    console.log(error);  // Logs the error to the console
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

export const getSales = async (req, res) => {
  try {
    const sales = await prisma.sales.findMany({
      include: { details: true, user: true },
    });
    res.status(StatusCodes.OK).json(sales);
  } catch (error) {
    console.log(error);  // Logs the error to the console
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
    console.log(error);  // Logs the error to the console
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

    // Validate user existence if updated
    if (userId) {
      const userExists = await prisma.users.findUnique({ where: { id: userId } });
      if (!userExists) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: "User not found" });
      }
    }

    const updatedSale = await prisma.$transaction(async (prisma) => {
      // Clear old sale details
      await prisma.saleDetails.deleteMany({
        where: { saleId: Number(id) },
      });

      // Update sale and add new sale details
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
    console.log(error);  // Logs the error to the console
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
    console.log(error);  // Logs the error to the console
    if (error.code === "P2003") {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: "Cannot delete sale due to existing references",
      });
    }
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};
