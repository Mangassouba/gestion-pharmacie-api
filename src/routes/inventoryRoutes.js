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

const iventoryRouter = express.Router();

iventoryRouter.post("/inventories", createInventoryValidator, createInventory);
iventoryRouter.get("/inventories", getInventories);
iventoryRouter.get("/inventories/:id", getInventoryByIdValidator, getInventoryById);
iventoryRouter.put("/inventories/:id", updateInventoryValidator, updateInventory);
iventoryRouter.delete("/inventories/:id", deleteInventoryValidator, deleteInventory);

export default iventoryRouter;
