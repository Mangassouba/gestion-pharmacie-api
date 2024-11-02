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
import { authenticateToken,authorizeRole } from '../middlewares/authMiddleware.js';

const movementRouter = express.Router();

movementRouter.post("/movements", authenticateToken, createStockMovementValidator, createStockMovement);
movementRouter.get("/movements", authenticateToken, getStockMovements);
movementRouter.get("/movements/:id", authenticateToken, getByIdValidator, getStockMovementById);
movementRouter.put("/movements/:id", authenticateToken, updateStockMovementValidator, updateStockMovement);
movementRouter.delete("/movements/:id", authenticateToken, authorizeRole('ADMIN'), deleteValidator, deleteStockMovement);

export default movementRouter;
