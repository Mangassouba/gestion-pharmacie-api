import express from "express";
import {
  createStockMovement,
  getStockMovements,
  getStockMovementById,
  updateStockMovement,
  deleteStockMovement,
} from "../controllers/stockMovementsController.js";
import {
  createStockMovementValidator,
  updateStockMovementValidator,
  getByIdValidator,
  deleteValidator,
} from "../validators/stockMovementsValidator.js";

const movementRouter = express.Router();

movementRouter.post("/movements", createStockMovementValidator, createStockMovement);
movementRouter.get("/movements", getStockMovements);
movementRouter.get("/movements/:id", getByIdValidator, getStockMovementById);
movementRouter.put("/movements/:id", updateStockMovementValidator, updateStockMovement);
movementRouter.delete("/movements/:id", deleteValidator, deleteStockMovement);

export default movementRouter;
