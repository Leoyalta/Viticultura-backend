import Joi from 'joi';
import { phoneRegExp, emailRegExp } from '../constants/clients.js';

export const clientAddSchema = Joi.object({
  name: Joi.string().trim().min(2).required().messages({
    'string.empty': 'El campo "name" es obligatorio.',
  }),

  secondName: Joi.string().trim().min(2).required().messages({
    'string.empty': 'El campo "secondName" es obligatorio.',
  }),

  phone: Joi.string().pattern(phoneRegExp).required().messages({
    'string.pattern.base':
      'El campo "phone" debe tener el formato +34 600 000 000.',
    'string.empty': 'El campo "phone" es obligatorio.',
  }),

  email: Joi.string().pattern(emailRegExp).required().messages({
    'string.pattern.base': 'El campo "email" no es válido.',
    'string.empty': 'El campo "email" es obligatorio.',
  }),

  address: Joi.object({
    street: Joi.string().allow('').optional(),
    city: Joi.string().allow('').optional(),
    postalCode: Joi.string().allow('').optional(),
    province: Joi.string().allow('').optional(),
    country: Joi.string().default('España'),
    location: Joi.object({
      type: Joi.string().valid('Point').required(),
      coordinates: Joi.array()
        .items(Joi.number())
        .length(2)
        .required()
        .messages({
          'array.length': 'Las coordenadas deben contener [lng, lat].',
        }),
    }).required(),
  }).required(),
});

export const clientPatchSchema = Joi.object({
  name: Joi.string(),
  secondName: Joi.string(),
  phone: Joi.string().pattern(phoneRegExp).messages({
    'string.pattern.base':
      'El campo "phone" debe tener el formato +34 600 000 000.',
  }),
  email: Joi.string().pattern(emailRegExp).messages({
    'string.email': 'Email no válido.',
  }),
  address: Joi.object({
    street: Joi.string().allow(''),
    city: Joi.string().allow(''),
    postalCode: Joi.string().allow(''),
    province: Joi.string().allow(''),
    country: Joi.string(),
    location: Joi.object({
      type: Joi.string().valid('Point'),
      coordinates: Joi.array().items(Joi.number()).length(2),
    }),
  }),
}).min(1);
