import express from "express";
import {
  createBatch,
  getBatches,
  getBatchById,
  updateBatch,
  deleteBatch,
} from "../controllers/batchesController.js";
import { authenticateToken,authorizeRole } from '../middlewares/authMiddleware.js';
import { batchIdValidator,batchupdateValidator, batchValidator, deleteBatchValidator } from "../validators/batchesValidator.js";

const batcheRrouter = express.Router();

batcheRrouter.post("/batches", authenticateToken, batchValidator,  createBatch);
batcheRrouter.get("/batches", authenticateToken, getBatches);
batcheRrouter.get("/batches/:id", authenticateToken, batchIdValidator, getBatchById);
batcheRrouter.put("/batches/:id", authenticateToken, batchupdateValidator,  updateBatch);
batcheRrouter.delete("/batches/:id", authenticateToken, authorizeRole, deleteBatchValidator, deleteBatch);

export default batcheRrouter;
