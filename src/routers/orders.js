import { Router } from 'express';

import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../utils/validateBody.js';
import isValidId from '../middlewares/isValidId.js';
import { orderAddSchema, orderPatchSchema } from '../validation/orders.js';

import * as orderControllers from '../controllers/orders.js';

const ordersRouter = Router();

ordersRouter.post(
  '/',
  validateBody(orderAddSchema),
  ctrlWrapper(orderControllers.addOrderController),
);
ordersRouter.get('/', ctrlWrapper(orderControllers.getAllOrdersController));

ordersRouter.get(
  '/:id',
  isValidId,
  ctrlWrapper(orderControllers.getOrderByIdController),
);

ordersRouter.put(
  '/:id',
  isValidId,
  validateBody(orderAddSchema),
  ctrlWrapper(orderControllers.upsertOrderController),
);

ordersRouter.patch(
  '/:id',
  isValidId,
  validateBody(orderPatchSchema),
  ctrlWrapper(orderControllers.updateOrderController),
);

ordersRouter.delete(
  '/:id',
  isValidId,
  ctrlWrapper(orderControllers.deleteOrderController),
);

export default ordersRouter;
