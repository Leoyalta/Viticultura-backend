import { Router } from 'express';
import * as clientControllers from '../controllers/clients.js';

import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../utils/validateBody.js';
import { clientAddSchema, clientPatchSchema } from '../validation/clients.js';
import isValidId from '../middlewares/isValidId.js';

const clientsRouter = Router();

clientsRouter.get('/', ctrlWrapper(clientControllers.getAllClientsController));

clientsRouter.get(
  '/:id',
  isValidId,
  ctrlWrapper(clientControllers.getClientByIdController),
);

clientsRouter.post(
  '/',
  validateBody(clientAddSchema),
  ctrlWrapper(clientControllers.addClientController),
);

clientsRouter.put(
  '/:id',
  isValidId,
  validateBody(clientAddSchema),
  ctrlWrapper(clientControllers.upsertClientController),
);

clientsRouter.patch(
  '/:id',
  isValidId,
  validateBody(clientPatchSchema),
  ctrlWrapper(clientControllers.updateClientController),
);

clientsRouter.delete(
  '/:id',
  isValidId,
  ctrlWrapper(clientControllers.deleteClientController),
);

export default clientsRouter;
