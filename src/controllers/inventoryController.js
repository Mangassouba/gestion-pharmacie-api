import prisma from "../config/prisma.js";
import { StatusCodes } from "http-status-codes";

export const createInventory = async (req, res) => {
  try {
    const { inventory_date, stock, productId } = req.body;

    const newInventory = await prisma.inventories.create({
      data: {
        inventory_date,
        stock,
        product: { connect: { id: productId } }
      }
    });

    res.status(StatusCodes.CREATED).json(newInventory);
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.BAD_REQUEST).json({ error: "Error creating inventory", details: error.message });
  }
};

export const getInventories = async (req, res) => {
  try {
    const inventories = await prisma.inventories.findMany({
      include: { product: true }
    });
    res.status(StatusCodes.OK).json(inventories);
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.BAD_REQUEST).json({ error: "Error retrieving inventories", details: error.message });
  }
};

export const getInventoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const inventory = await prisma.inventories.findUnique({
      where: { id: parseInt(id) },
      include: { product: true }
    });

    if (!inventory) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: "Inventory not found" });
    }

    res.status(StatusCodes.OK).json(inventory);
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.BAD_REQUEST).json({ error: "Error retrieving inventory", details: error.message });
  }
};

export const updateInventory = async (req, res) => {
  const { id } = req.params;
  const { inventory_date, stock, productId } = req.body;

  try {
    const existingInventory = await prisma.inventories.findUnique({
      where: { id: parseInt(id) }
    });

    if (!existingInventory) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: "Inventory not found" });
    }

    const updatedInventory = await prisma.inventories.update({
      where: { id: parseInt(id) },
      data: {
        inventory_date,
        stock,
        productId
      }
    });

    res.status(StatusCodes.OK).json(updatedInventory);
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.BAD_REQUEST).json({ error: "Error updating inventory", details: error.message });
  }
};

export const deleteInventory = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.inventories.delete({
      where: { id: parseInt(id) }
    });

    res.status(StatusCodes.OK).json({ message: "Inventory deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.BAD_REQUEST).json({ error: "Error deleting inventory", details: error.message });
  }
};
