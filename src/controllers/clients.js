import * as clientService from '../services/clients.js';
import parsePaginationParams from '../utils/parsePaginationParams.js';
import parseSortParams from '../utils/parseSortParams.js';
import parseClientsFilterParams from '../utils/filters/parseClientsFilterParams.js';
import { ClientSortFields } from '../db/models/Clients.js';
import createHttpError from 'http-errors';

export const getAllClientsController = async (req, res) => {
  const { per_page, page } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams({
    ...req.query,
    sortFields: ClientSortFields,
  });
  const filter = parseClientsFilterParams(req.query);

  const data = await clientService.getAllClients({
    per_page,
    page,
    sortBy,
    sortOrder,
    filter,
  });

  res.json({
    status: 200,
    message: 'Successfully retrieved clients',
    data,
  });
};

export const getClientByIdController = async (req, res) => {
  const { id } = req.params;
  const client = await clientService.getClient(id);

  if (!client) {
    throw createHttpError(404, `Client with id:${id} does not exist`);
  }

  res.json({
    status: 200,
    message: `Client with id:${id} is found`,
    client,
  });
};
export const addClientController = async (req, res) => {
  const data = await clientService.addClient(req.body);

  res.json({
    status: 201,
    message: 'Client is created',
    data,
  });
};

export const upsertClientController = async (req, res) => {
  const { id } = req.params;
  const { isNew, data } = await clientService.updateClient(
    { _id: id },
    req.body,
    { upsert: true },
  );
  const status = isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: 'Client upsert successfully',
    newProduct: isNew,
    data,
  });
};

export const updateClientController = async (req, res) => {
  const { id } = req.params;
  const updatedClient = await clientService.updateClient({ _id: id }, req.body);

  if (!updatedClient.data.value) {
    throw createHttpError(404, `Client with id:${id} does not exist`);
  }

  res.json({
    status: 200,
    message: `Client with id:${id} is successfully updated`,
    data: updatedClient.data,
  });
};

// controllers/clients.js
export const deleteClientController = async (req, res) => {
  const { id } = req.params;
  const deletedClient = await clientService.deleteClient({ _id: id });

  if (!deletedClient) {
    throw createHttpError(404, `Client with id:${id} not found`);
  }

  res.status(204).send();
};
