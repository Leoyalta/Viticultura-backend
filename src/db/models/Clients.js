import { Schema, model } from 'mongoose';
import { handleServerError, setUpdateOptions } from './mongooseHooks.js';
import { phoneRegExp, emailRegExp } from '../../constants/clients.js';

const clientSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'El campo "name" es obligatorio.'],
    },
    secondName: {
      type: String,
      required: [true, 'El campo "secondName" es obligatorio.'],
    },
    phone: {
      type: String,
      required: [true, 'El campo "phone" es obligatorio.'],
      validate: {
        validator: function (v) {
          return phoneRegExp.test(v);
        },
        message: () =>
          'El campo "phone" debe tener el formato: +34 600 000 000.',
      },
    },
    email: {
      type: String,
      required: [true, 'El campo "email" es obligatorio.'],
      unique: true,
      validate: {
        validator: function (v) {
          return emailRegExp.test(v);
        },
        message: () =>
          'El campo "email" debe tener un formato válido, por ejemplo: mango@gmail.com.',
      },
    },
    address: {
      street: { type: String },
      city: { type: String },
      postalCode: { type: String },
      province: { type: String },
      country: { type: String, default: 'España' },
      location: {
        type: {
          type: String,
          enum: ['Point'],
          default: 'Point',
        },
        coordinates: {
          type: [Number],
          required: true,
          validate: {
            validator: (val) => Array.isArray(val) && val.length === 2,
            message: 'Coordinates must be an array of two numbers [lng, lat]',
          },
        },
      },
    },
  },
  { versionKey: false, timestamps: true },
);

// Індекс для адреси (опціонально, якщо шукаємо по координатах)
clientSchema.index({ 'address.location': '2dsphere' });

clientSchema.post('save', handleServerError);
clientSchema.pre('findOneAndUpdate', setUpdateOptions);
clientSchema.post('findOneAndUpdate', handleServerError);

const ClientCollection = model('Client', clientSchema);

export const ClientSortFields = ['name', 'secondName', 'phone', 'email'];
export default ClientCollection;
