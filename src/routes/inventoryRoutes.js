import express from "express";
import {
  createInventory,
  getInventories,
  getInventoryById,
  updateInventory,
  deleteInventory
} from "../controllers/inventoryController.js";
import {
  createInventoryValidator,
  getInventoryByIdValidator,
  updateInventoryValidator,
  deleteInventoryValidator
} from "../validators/inventoryValidators.js";
import { authenticateToken,authorizeRole } from '../middlewares/authMiddleware.js';

const iventoryRouter = express.Router();

iventoryRouter.post("/inventories", authenticateToken, createInventoryValidator, createInventory);
iventoryRouter.get("/inventories", authenticateToken, getInventories);
iventoryRouter.get("/inventories/:id", authenticateToken, getInventoryByIdValidator, getInventoryById);
iventoryRouter.put("/inventories/:id", authenticateToken, updateInventoryValidator, updateInventory);
iventoryRouter.delete("/inventories/:id", authenticateToken, authorizeRole('ADMIN'), deleteInventoryValidator, deleteInventory);

export default iventoryRouter;
