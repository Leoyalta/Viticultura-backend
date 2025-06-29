// import createHttpError from 'http-errors';
import * as locationsService from '../services/locations.js';

export const getAllLocationsController = async (req, res) => {
  const owner = req.query.owner;
  const data = await locationsService.getAllLocations({ owner });
  console.log(data);

  res.json({
    status: 200,
    message: 'Locations retrieved',
    data,
  });
};

export const addLocationController = async (req, res) => {
  const data = await locationsService.addLocation(req.body);

  res.json({
    status: 201,
    message: 'Location created',
    data,
  });
};
