import { Schema, model } from 'mongoose';
// import { handleServerError, setUpdateOptions } from './mongooseHooks.js';
import { locationTypeList } from '../../constants/locations.js';
import { handleServerError, setUpdateOptions } from './mongooseHooks.js';
import './Client.js';

const locationSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'Client',
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

locationSchema.post('save', handleServerError);
locationSchema.pre('findOneAndUpdate', setUpdateOptions);
locationSchema.post('findOneAndUpdate', handleServerError);

const LocationCollection = model('Location', locationSchema);
export default LocationCollection;
