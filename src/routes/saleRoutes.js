import express from "express";
import { createSale, getSales, updateSale, deleteSale, getSaleById } from "../controllers/saleController.js"
import { addSaleValidator, getSaleByIdValidator, updateSaleValidator, deleteSaleValidator  } from "../validators/saleValidator.js";

const saleRouter = express.Router();

saleRouter.post("/sale",addSaleValidator,  createSale);
saleRouter.get("/sale", getSales);
saleRouter.get("/sale/:id",getSaleByIdValidator,  getSaleById);
saleRouter.put("/sale/:id",updateSaleValidator, updateSale);
saleRouter.delete("/sale/:id",deleteSaleValidator,  deleteSale);

export default saleRouter;
