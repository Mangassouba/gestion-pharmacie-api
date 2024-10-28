import express from "express";
import {
  createReception,
  getReceptions,
  getReceptionById,
  updateReception,
  deleteReception
} from "../controllers/receptionController.js";
import {
  createReceptionValidator,
  getReceptionByIdValidator,
  updateReceptionValidator,
  deleteReceptionValidator
} from "../validators/receptionValidator.js";
import { authenticateToken,authorizeRole } from '../middlewares/authMiddleware.js';

const receptionsRouter = express.Router();

receptionsRouter.post("/receptions", authenticateToken, createReceptionValidator, createReception);
receptionsRouter.get("/receptions", authenticateToken, getReceptions);
receptionsRouter.get("/receptions/:id", authenticateToken, getReceptionByIdValidator, getReceptionById);
receptionsRouter.put("/receptions/:id", authenticateToken, updateReceptionValidator, updateReception);
receptionsRouter.delete("/receptions/:id", authenticateToken, authorizeRole, deleteReceptionValidator, deleteReception);

export default receptionsRouter;
