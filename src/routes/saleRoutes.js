import express from "express";
import { createSale, getSales, updateSale, deleteSale, getSaleById } from "../controllers/saleController.js"
import { addSaleValidator, getSaleByIdValidator, updateSaleValidator, deleteSaleValidator  } from "../validators/saleValidator.js";
import { authenticateToken,authorizeRole } from '../middlewares/authMiddleware.js';

const saleRouter = express.Router();

saleRouter.post("/sale", authenticateToken, addSaleValidator,  createSale);
saleRouter.get("/sale", authenticateToken, getSales);
saleRouter.get("/sale/:id", authenticateToken, getSaleByIdValidator,  getSaleById);
saleRouter.put("/sale/:id", authenticateToken, updateSaleValidator, updateSale);
saleRouter.delete("/sale/:id", authenticateToken, authorizeRole('ADMIN'), deleteSaleValidator,  deleteSale);

export default saleRouter;
