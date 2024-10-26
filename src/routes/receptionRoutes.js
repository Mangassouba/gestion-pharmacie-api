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

const receptionsRouter = express.Router();

receptionsRouter.post("/receptions", createReceptionValidator, createReception);
receptionsRouter.get("/receptions", getReceptions);
receptionsRouter.get("/receptions/:id", getReceptionByIdValidator, getReceptionById);
receptionsRouter.put("/receptions/:id", updateReceptionValidator, updateReception);
receptionsRouter.delete("/receptions/:id", deleteReceptionValidator, deleteReception);

export default receptionsRouter;
