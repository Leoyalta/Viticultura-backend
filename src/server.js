import express from 'express';
import cors from 'cors';
// import pino from 'pino-http';
import { env } from './utils/env.js';

import * as productsService from './services/product.js';

export const startServer = () => {
  const app = express();
  // const logger = pino({
  //   transport: {
  //     target: 'pino-pretty',
  //   },
  // });

  // app.use(logger);
  app.use(cors());
  app.use(express.json());

  app.get('/products', async (req, res) => {
    const productsData = await productsService.getAllMovies();

    res.json({
      status: 200,
      message: 'Successfully founded products',
      productsData,
    });
  });

  app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await productsService.getMovie(id);

    if (!product) {
      res.status(404).json({
        message: `Product with id:${id} is not exist`,
      });
    }

    res.json({
      status: 200,
      message: `Product with id:${id} is found`,
      product,
    });
  });

  app.use((req, res) => {
    res.status(404).json({
      message: `${req.url} rout is not found.`,
    });
  });
  app.use((error, req, res, next) => {
    res.status(500).json({
      message: error.message,
    });
  });

  const port = Number(env('PORT', 3030));
  app.listen(port, () => {
    console.log(`Server is running on PORT ${port}`);
  });
};
