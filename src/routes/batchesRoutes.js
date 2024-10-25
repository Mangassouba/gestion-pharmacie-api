import express from "express";
import {
  createBatch,
  getBatches,
  getBatchById,
  updateBatch,
  deleteBatch,
} from "../controllers/batchesController.js";
import { batchIdValidator,batchupdateValidator, batchValidator, deleteBatchValidator } from "../validators/batchesValidator.js";

const batcheRrouter = express.Router();

batcheRrouter.post("/batches",batchValidator,  createBatch);
batcheRrouter.get("/batches", getBatches);
batcheRrouter.get("/batches/:id", batchIdValidator, getBatchById);
batcheRrouter.put("/batches/:id",batchupdateValidator,  updateBatch);
batcheRrouter.delete("/batches/:id", deleteBatchValidator, deleteBatch);

export default batcheRrouter;
