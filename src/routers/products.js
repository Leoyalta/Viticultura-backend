import { Router } from 'express';
import * as productControllers from '../controllers/products.js';

import ctrlWrapper from '../utils/ctrlWrapper.js';

const productsRouter = Router();

productsRouter.get(
  '/',
  ctrlWrapper(productControllers.getAllProducatsController),
);

productsRouter.get(
  '/:id',
  ctrlWrapper(productControllers.getProductByIdController),
);

productsRouter.post('/', ctrlWrapper(productControllers.addProductController));

productsRouter.put(
  '/:id',
  ctrlWrapper(productControllers.upsertProductController),
);

productsRouter.patch(
  '/:id',
  ctrlWrapper(productControllers.updateProductController),
);

productsRouter.delete(
  '/:id',
  ctrlWrapper(productControllers.deleteProductController),
);
export default productsRouter;
