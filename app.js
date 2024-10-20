import express from 'express'
import cors from 'cors'


const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('API Gestion Stock Pharmacie');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
