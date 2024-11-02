import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './src/routes/userRoutes.js';
import productRoute from './src/routes/productRoutes.js';
import clientRouter from './src/routes/customersRoutes.js';
import supplierRouter from './src/routes/supplierRoutes.js';
import ordersRouter from './src/routes/ordersRoutes.js';
import saleRouter from './src/routes/saleRoutes.js';
import batcheRrouter from './src/routes/batchesRoutes.js';
import movementRouter from './src/routes/stockMovements.js';
import iventoryRouter from './src/routes/inventoryRoutes.js';
import receptionsRouter from './src/routes/receptionRoutes.js';
import authRouter from './src/routes/authRoutes.js';
// import prisma from './src/config/prisma';


const corsOptions = {
  origin: "http://localhost:5173/",
};

const app = express();
app.use(cors("*", corsOptions));
dotenv.config();

// const app = express();
app.use(cors());
app.use(express.json());

app.use(authRouter)
app.use(router);
app.use(productRoute);
app.use(supplierRouter)
app.use(clientRouter);
app.use(ordersRouter);
app.use(saleRouter);
app.use(batcheRrouter)
app.use(movementRouter)
app.use(iventoryRouter)
app.use(receptionsRouter)

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Pharmacy Stock Management API');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
