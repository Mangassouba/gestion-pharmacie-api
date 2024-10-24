import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './src/routes/userRoutes.js';
import productRoute from './src/routes/productRoutes.js';
import clientRouter from './src/routes/clientRoutes.js';
// import prisma from './src/config/prisma';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(router);
app.use(productRoute);
app.use(clientRouter);

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Pharmacy Stock Management API');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
