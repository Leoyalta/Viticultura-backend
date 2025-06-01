import { Schema, model } from 'mongoose';

const productSchema = new Schema(
  {
    variedad: {
      type: String,
      enum: [
        'Macabeu',
        'Xarello',
        'Parellada',
        'Tempranillo',
        'Garnacha',
        'Chardonnay',
        'Verdejo',
        'Sauvignon Blanc',
      ],
      required: true,
    },
    clon: {
      type: String,
      required: true,
    },
    pie: {
      type: String,
      required: true,
    },

    clonPie: {
      type: String,
      required: true,
    },
    total: {
      type: Number,
      reqired: true,
    },
    isAvailable: {
      type: Boolean,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

const ProductCollection = model('product', productSchema);

export default ProductCollection;
