import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './src/routes/userRoutes.js';
// import prisma from './src/config/prisma';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(router);

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Pharmacy Stock Management API');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
