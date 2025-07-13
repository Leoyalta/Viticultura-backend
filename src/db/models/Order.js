import { Schema, model } from 'mongoose';
import { handleServerError, setUpdateOptions } from './mongooseHooks.js';

const orderSchema = new Schema(
  {
    client: {
      type: Schema.Types.ObjectId,
      ref: 'client',
      required: [true, 'El cliente es obligatorio.'],
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'product',
      required: [true, 'El producto es obligatorio.'],
    },
    quantity: {
      type: Number,
      required: [true, 'La cantidad es obligatoria.'],
      min: [1, 'La cantidad debe ser al menos 1.'],
    },
    plantingRequested: {
      type: Boolean,
      default: false,
    },
    plantingDate: {
      type: Date,
      required: function () {
        return this.plantingRequested;
      },
    },
  },
  { versionKey: false, timestamps: true },
);

orderSchema.post('save', handleServerError);
orderSchema.pre('findOneAndUpdate', setUpdateOptions);
orderSchema.post('findOneAndUpdate', handleServerError);

const OrderCollection = model('order', orderSchema);
export default OrderCollection;
