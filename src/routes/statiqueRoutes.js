import express from 'express';
import { getProductStatistics } from "../controllers/productController.js";
import { getTodaySales } from "../controllers/saleController.js";

getTodaySales
getProductStatistics

const statistics = express.Router();

statistics.get('/sales/today', getTodaySales),
statistics.get('/statistics', getProductStatistics)

export default statistics;