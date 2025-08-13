import Joi from 'joi';
import { emailRegExp } from '../constants/clients.js';
import { passwordRegExp } from '../constants/user.js';

export const userSignupSchema = Joi.object({
  userName: Joi.string().trim().min(2).required().messages({
    'string.empty': 'El campo "userName" es obligatorio.',
    'string.min':
      'El campo "userName" debe tener al menos {#limit} caracteres.',
  }),

  email: Joi.string().pattern(emailRegExp).required().messages({
    'string.pattern.base': 'El campo "email" no es válido.',
    'string.empty': 'El campo "email" es obligatorio.',
  }),

  password: Joi.string().pattern(passwordRegExp).min(8).required().messages({
    'string.pattern.base':
      'El campo "contraseña" no cumple con los requisitos de seguridad.',
    'string.empty': 'El campo "contraseña" es obligatorio.',
    'string.min':
      'El campo "contraseña" debe tener al menos {#limit} caracteres.',
  }),
});

export const userSigninSchema = Joi.object({
  userName: Joi.string().trim().min(2).messages({
    'string.min':
      'El campo "userName" debe tener al menos {#limit} caracteres.',
    'string.empty': 'El campo "userName" no puede estar vacío.',
  }),

  email: Joi.string().pattern(emailRegExp).messages({
    'string.pattern.base': 'El campo "email" no es válido.',
    'string.empty': 'El campo "email" no puede estar vacío.',
  }),

  password: Joi.string().trim().min(6).required().messages({
    'string.empty': 'El campo "contraseña" es obligatorio.',
    'string.min':
      'El campo "contraseña" debe tener al menos {#limit} caracteres.',
  }),
})
  .or('email', 'userName')
  .messages({
    'object.missing':
      'Debe proporcionar "email" o "userName" para iniciar sesión.',
  });
