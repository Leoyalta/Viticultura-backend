import { Schema, model } from 'mongoose';
import { locationTypeList } from '../../constants/locations.js';
import { handleSaveError, setUpdateOptions } from './mongooseHooks.js';
import './Client.js';

const locationSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'client',
      required: true,
    },
    locationName: {
      type: String,
      required: true,
    },
    geometry: {
      type: {
        type: String,
        enum: locationTypeList,
        required: true,
      },
      coordinates: {
        type: Schema.Types.Mixed,
        required: true,
      },
    },
  },
  { versionKey: false, timestamps: true },
);

locationSchema.index({ geometry: '2dsphere' });

locationSchema.post('save', handleSaveError);
locationSchema.pre('findOneAndUpdate', setUpdateOptions);
locationSchema.post('findOneAndUpdate', handleSaveError);

const LocationCollection = model('location', locationSchema);
export default LocationCollection;
