import Joi from 'joi';
import {
  varietyList,
  pieVarietyList,
  codeRegexp,
} from '../constants/products.js';

export const productAddSchem = Joi.object({
  code: Joi.string().pattern(codeRegexp).required().messages({
    'string.empty': 'El campo "code" es obligatorio.',
    'string.pattern.base':
      'El campo "code" debe tener el formato XX-XX-XX (por ejemplo: 01-02-03 o 100-20-333).',
  }),

  variety: Joi.string()
    .valid(...varietyList)
    .required()
    .messages({
      'any.only': 'El campo "variety" debe ser uno de los valores permitidos.',
      'string.empty': 'El campo "variety" es obligatorio.',
    }),

  pie: Joi.string()
    .valid(...pieVarietyList)
    .required()
    .messages({
      'any.only': 'El campo "pie" debe ser uno de los valores permitidos.',
      'string.empty': 'El campo "pie" es obligatorio.',
    }),

  clon: Joi.string().required().messages({
    'string.empty': 'El campo "clon" es obligatorio.',
  }),

  clonPie: Joi.string().required().messages({
    'string.empty': 'El campo "clonPie" es obligatorio.',
  }),

  total: Joi.number().required().messages({
    'number.base': 'El campo "total" debe ser un número.',
    'any.required': 'El campo "total" es obligatorio.',
  }),

  isAvailable: Joi.boolean().messages({
    'boolean.base':
      'El campo "isAvailable" debe ser un valor booleano (true o false).',
  }),
});

export const productPatchSchem = Joi.object({
  code: Joi.string().pattern(codeRegexp).required().messages({
    'string.empty': 'El campo "code" es obligatorio.',
    'string.pattern.base':
      'El campo "code" debe tener el formato XX-XX-XX (por ejemplo: 01-02-03 o 100-20-333).',
  }),

  variety: Joi.string()
    .valid(...varietyList)
    .messages({
      'any.only': 'El campo "variety" debe ser uno de los valores permitidos.',
      'string.empty': 'El campo "variety" es obligatorio.',
    }),

  pie: Joi.string()
    .valid(...pieVarietyList)
    .messages({
      'any.only': 'El campo "pie" debe ser uno de los valores permitidos.',
      'string.empty': 'El campo "pie" es obligatorio.',
    }),

  clon: Joi.string().messages({
    'string.empty': 'El campo "clon" es obligatorio.',
  }),

  clonPie: Joi.string().messages({
    'string.empty': 'El campo "clonPie" es obligatorio.',
  }),

  total: Joi.number().messages({
    'number.base': 'El campo "total" debe ser un número.',
    'any.required': 'El campo "total" es obligatorio.',
  }),

  isAvailable: Joi.boolean().messages({
    'boolean.base':
      'El campo "isAvailable" debe ser un valor booleano (true o false).',
  }),
});
