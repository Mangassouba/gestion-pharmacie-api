import express from 'express';
import { getProductStatistics } from "../controllers/productController.js";
import { getLowStockProducts, getMonthlySales } from "../controllers/saleController.js";

// getMonthlySales
// getProductStatistics

const statistics = express.Router();

statistics.get('/sales/today', getMonthlySales),
statistics.get('/statistics', getProductStatistics)
statistics.get('/low-stock',getLowStockProducts)

export default statistics;