import { Schema, model } from 'mongoose';
import { handleSaveError, setUpdateOptions } from './mongooseHooks.js';
import { allowedOrderStatuses } from '../../constants/orders.js';

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
    status: {
      type: String,
      enum: {
        values: allowedOrderStatuses,
        message: 'Estado inválido.',
      },
      default: 'pending',
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

orderSchema.post('save', handleSaveError);
orderSchema.pre('findOneAndUpdate', setUpdateOptions);
orderSchema.post('findOneAndUpdate', handleSaveError);

const OrderCollection = model('Order', orderSchema);
export default OrderCollection;
