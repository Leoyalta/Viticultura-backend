import Joi from 'joi';
import { locationTypeList } from '../constants/locations.js';

export const locationsAddSchem = Joi.object({
  owner: Joi.string().required().messages({
    'string.empty': 'El campo "owner" es obligatorio.',
  }),

  locationName: Joi.string().required().messages({
    'string.empty': 'El campo "locationName" es obligatorio.',
  }),

  geometry: Joi.object({
    type: Joi.string()
      .valid(...locationTypeList)
      .required()
      .messages({
        'any.required': 'El campo "geometry.type" es obligatorio.',
        'any.only': `El campo "geometry.type" debe ser uno de: ${locationTypeList.join(
          ', ',
        )}`,
      }),

    coordinates: Joi.alternatives()
      .try(
        Joi.array().items(Joi.number()), // Point
        Joi.array().items(Joi.array().items(Joi.number())), // LineString
        Joi.array().items(
          Joi.array().items(Joi.array().items(Joi.number())), // Polygon
        ),
      )
      .required()
      .messages({
        'any.required': 'El campo "geometry.coordinates" es obligatorio.',
      }),
  }).required(),
});
