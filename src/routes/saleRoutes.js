import express from "express";
import { createSale, getSales, updateSale, deleteSale, getSaleById } from "../controllers/saleController.js"
// import { addSaleValidator, getSaleByIdValidator, updateSaleValidator } from "../validators/salesValidator.js";

const saleRouter = express.Router();

saleRouter.post("/sale",  createSale);
saleRouter.get("/sale", getSales);
saleRouter.get("/sale/:id",  getSaleById);
saleRouter.put("/sale/:id", updateSale);
saleRouter.delete("/sale/:id",  deleteSale);

export default saleRouter;
