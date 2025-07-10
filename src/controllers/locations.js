import createHttpError from 'http-errors';
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

export const deleteLocationController = async (req, res) => {
  const { id } = req.params;

  const deletedLocation = await locationsService.deleteLocation({ _id: id });

  if (!deletedLocation) {
    throw createHttpError(404, `Location with id:${id} not found`);
  }
  res.status(204).send();
};

// export const deleteClientController = async (req, res) => {
//   const { id } = req.params;
//   const deletedClient = await clientService.deleteClient({ _id: id });

//   if (!deletedClient) {
//     throw createHttpError(404, `Client with id:${id} not found`);
//   }

//   res.status(204).send();
// };
