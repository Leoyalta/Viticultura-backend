import express from 'express';
import cors from 'cors';
import logger from './middlewares/logger.js';
import { env } from './utils/env.js';

import productsRouter from './routers/products.js';
import locationsRouter from './routers/locations.js';
import clientsRouter from './routers/clients.js';
import ordersRouter from './routers/orders.js';

import notFoundHandler from './middlewares/notFoundHandler.js';
import errorHandler from './middlewares/errorHandler.js';

export const startServer = () => {
  const app = express();

  app.use(logger);

  app.use(cors());
  app.use(express.json());

  app.use('/products', productsRouter);
  app.use('/locations', locationsRouter);
  app.use('/clients', clientsRouter);
  app.use('/orders', ordersRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  const port = Number(env('PORT', 3030));
  app.listen(port, () => {
    console.log(`Server is running on PORT ${port}`);
  });
};
