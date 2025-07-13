import LocationCollection from '../db/models/Location.js';

export const getAllLocations = async ({ owner } = {}) => {
  const filter = {};
  if (owner) {
    filter.owner = owner;
  }

  return LocationCollection.find(filter)
    .populate('owner', 'name secondName phone')
    .select(['locationName', 'geometry', 'owner'].join(' '));
};

export const addLocation = (payload) => {
  return LocationCollection.create(payload);
};

export const deleteLocation = (filter) => {
  return LocationCollection.findOneAndDelete(filter);
};
