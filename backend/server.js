import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import { NotFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';

import productRoutes from './routes/productRoutes.js';

dotenv.config();

connectDB();

const app = express();

app.get('/', (req, res) => {
  res.send('API is Running...');
});

app.use('/api/products', productRoutes);

app.use(NotFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server Running on ${process.env.NODE_ENV} Mode on Port ${PORT}`.yellow.bold
  )
);
