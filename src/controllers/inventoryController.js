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

export const createInventory = async (req, res) => {
    const { inventory_date, stock, productId } = req.body;
  
    try {
      // Vérifier si le produit existe
      const product = await prisma.products.findUnique({
        where: { id: productId },
      });
  
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      // Créer un nouvel inventaire
      const newInventory = await prisma.inventories.create({
        data: {
          inventory_date: new Date(inventory_date),
          stock,
          productId,
        },
      });
  
      // Calculer la différence de stock
      const quantityChange = stock - product.stock;
  
      // Mettre à jour le stock du produit
      await prisma.products.update({
        where: { id: productId },
        data: { stock: stock },
      });
  
      // Enregistrer le mouvement de stock
      await logStockMovement(productId, quantityChange, 'inventory creation');
  
      res.status(StatusCodes.CREATED).json(newInventory);
    } catch (error) {
      console.error('Error creating inventory:', error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Error while creating inventory.' });
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
    const { stock } = req.body;
  
    try {
      const existingInventory = await prisma.inventories.findUnique({
        where: { id: parseInt(id) },
      });
  
      if (!existingInventory) {
        return res.status(404).json({ error: 'Inventory not found' });
      }
  
      const product = await prisma.products.findUnique({
        where: { id: existingInventory.productId },
      });
  
      // Update the inventory
      const updatedInventory = await prisma.inventories.update({
        where: { id: parseInt(id) },
        data: { stock },
      });
  
      // Log the stock movement based on the new inventory level
      const quantityChange = stock - product.stock; // Calculate stock change
      await prisma.products.update({
        where: { id: existingInventory.productId },
        data: { stock: stock }, // Update stock in products
      });
  
      await logStockMovement(existingInventory.productId, quantityChange, 'inventory update');
  
      res.status(StatusCodes.OK).json(updatedInventory);
    } catch (error) {
      console.error('Error updating inventory:', error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Error while updating inventory.' });
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
