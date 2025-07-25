import { Schema, model } from 'mongoose';
import {
  varietyList,
  pieVarietyList,
  codeRegexp,
} from '../../constants/products.js';
import {
  handleServerError,
  setUpdateOptions,
  attachStockHook,
} from './mongooseHooks.js';

const productSchema = new Schema(
  {
    code: {
      type: String,
      required: [true, 'El campo "code" es obligatorio.'],
      validate: {
        validator: (v) => codeRegexp.test(v),
        message:
          'El campo "code" debe tener el formato XX-XX-XX o XXX-XXX-XXX (por ejemplo: 01-02-03 o 100-20-333).',
      },
    },
    variety: {
      type: String,
      enum: {
        values: varietyList,
        message: 'El campo "variety" debe ser uno de los valores permitidos.',
      },
      required: [true, 'El campo "variety" es obligatorio.'],
    },
    clon: {
      type: String,
      required: [true, 'El campo "clon" es obligatorio.'],
    },
    pie: {
      type: String,
      enum: {
        values: pieVarietyList,
        message: 'El campo "pie" debe ser uno de los valores permitidos.',
      },
      required: [true, 'El campo "pie" es obligatorio.'],
    },
    clonPie: {
      type: String,
      required: [true, 'El campo "clonPie" es obligatorio.'],
    },
    total: {
      type: Number,
      required: [true, 'El campo "total" es obligatorio.'],
    },
    stock: {
      type: Number,
      required: false,
      default: undefined,
    },
    reserved: {
      type: Number,
      required: false,
      default: 0,
    },
    isAvailable: {
      type: Boolean,
      required: [true, 'El campo "isAvailable" es obligatorio.'],
    },
  },
  { versionKey: false, timestamps: true },
);

productSchema.pre('save', attachStockHook);
productSchema.pre('findOneAndUpdate', setUpdateOptions);
productSchema.post('save', handleServerError);
productSchema.post('findOneAndUpdate', handleServerError);
const ProductCollection = model('product', productSchema);
export const sortFields = [
  'code',
  'variety',
  'clon',
  'pie',
  'clonPie',
  'total',
  'isAvailable',
  'createdAt',
  'updatedAt',
];
export default ProductCollection;
