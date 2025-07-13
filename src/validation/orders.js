import Joi from 'joi';

export const orderAddSchema = Joi.object({
  client: Joi.string().hex().length(24).required().messages({
    'string.empty': 'El campo "client" es obligatorio.',
    'string.hex': 'El ID del cliente debe estar en formato hexadecimal.',
    'string.length': 'El ID del cliente debe tener 24 caracteres.',
  }),

  product: Joi.string().hex().length(24).required().messages({
    'string.empty': 'El campo "product" es obligatorio.',
    'string.hex': 'El ID del producto debe estar en formato hexadecimal.',
    'string.length': 'El ID del producto debe tener 24 caracteres.',
  }),

  quantity: Joi.number().integer().min(1).required().messages({
    'number.base': 'El campo "quantity" debe ser un número.',
    'number.min': 'La cantidad mínima es 1.',
    'any.required': 'El campo "quantity" es obligatorio.',
  }),

  plantingRequested: Joi.boolean().required().messages({
    'boolean.base': 'El campo "plantingRequested" debe ser true o false.',
    'any.required': 'El campo "plantingRequested" es obligatorio.',
  }),

  plantingDate: Joi.date()
    .greater('now')
    .when('plantingRequested', {
      is: true,
      then: Joi.required(),
      otherwise: Joi.optional().strip(),
    })
    .messages({
      'date.base': 'El campo "plantingDate" debe ser una fecha válida.',
      'date.greater': 'La fecha de plantación debe ser posterior a hoy.',
      'any.required': 'Debe proporcionar una fecha si se solicita plantación.',
    }),
});

export const orderPatchSchema = Joi.object({
  client: Joi.string().hex().length(24).messages({
    'string.hex': 'El ID del cliente debe estar en formato hexadecimal.',
    'string.length': 'El ID del cliente debe tener 24 caracteres.',
  }),

  product: Joi.string().hex().length(24).messages({
    'string.hex': 'El ID del producto debe estar en formato hexadecimal.',
    'string.length': 'El ID del producto debe tener 24 caracteres.',
  }),

  quantity: Joi.number().integer().min(1).messages({
    'number.base': 'El campo "quantity" debe ser un número.',
    'number.min': 'La cantidad mínima es 1.',
  }),

  plantingRequested: Joi.boolean().messages({
    'boolean.base': 'El campo "plantingRequested" debe ser true o false.',
  }),

  plantingDate: Joi.date()
    .greater('now')
    .when('plantingRequested', {
      is: true,
      then: Joi.required(),
      otherwise: Joi.optional().strip(),
    })
    .messages({
      'date.base': 'El campo "plantingDate" debe ser una fecha válida.',
      'date.greater': 'La fecha de plantación debe ser posterior a hoy.',
    }),
});
