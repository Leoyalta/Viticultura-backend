import { Router } from 'express';
import * as productControllers from '../controllers/products.js';

import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../utils/validateBody.js';
import isValidId from '../middlewares/isValidId.js';

import { productAddSchem, productPatchSchem } from '../validation/products.js';

const productsRouter = Router();

productsRouter.get(
  '/',
  ctrlWrapper(productControllers.getAllProducatsController),
);

productsRouter.get(
  '/:id',
  isValidId,
  ctrlWrapper(productControllers.getProductByIdController),
);

productsRouter.post(
  '/',
  validateBody(productAddSchem),
  ctrlWrapper(productControllers.addProductController),
);

productsRouter.put(
  '/:id',
  isValidId,
  validateBody(productAddSchem),
  ctrlWrapper(productControllers.upsertProductController),
);

productsRouter.patch(
  '/:id',
  isValidId,
  validateBody(productPatchSchem),
  ctrlWrapper(productControllers.updateProductController),
);

productsRouter.delete(
  '/:id',
  isValidId,
  ctrlWrapper(productControllers.deleteProductController),
);
export default productsRouter;
