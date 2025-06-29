import { Router } from 'express';

import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../utils/validateBody.js';
import { locationsAddSchem } from '../validation/locations.js';

import isValidObjectIdQuery from '../middlewares/isValidOwner.js';
// import isValidId from '../middlewares/isValidId.js';

import * as locationControllers from '../controllers/locations.js';

const locationsRouter = Router();

locationsRouter.get(
  '/',
  isValidObjectIdQuery('owner'),
  ctrlWrapper(locationControllers.getAllLocationsController),
);

locationsRouter.post(
  '/',
  validateBody(locationsAddSchem),
  ctrlWrapper(locationControllers.addLocationController),
);

export default locationsRouter;
