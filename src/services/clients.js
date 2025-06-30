import ClientCollection from '../db/models/Clients.js';
import calculatePaginationData from '../utils/calculatePaginationData.js';

export const getAllClients = async ({
  per_page,
  page,
  sortBy = 'secondName',
  sortOrder = 'desc',
  filter = {},
}) => {
  const skip = (page - 1) * per_page;

  const clients = await ClientCollection.find(filter)
    .skip(skip)
    .limit(per_page)
    .sort({ [sortBy]: sortOrder });

  const count = await ClientCollection.countDocuments(filter);

  const paginationData = calculatePaginationData({ count, per_page, page });

  return {
    page,
    per_page,
    clients,
    totalClients: count,
    ...paginationData,
  };
};

export const getClient = (id) => {
  return ClientCollection.findById(id);
};
export const addClient = (payload) => {
  return ClientCollection.create(payload);
};

export const updateClient = async (filter, data, options = {}) => {
  const rowResult = await ClientCollection.findOneAndUpdate(filter, data, {
    includeResultMetadata: true,
    ...options,
  });

  return {
    data: rowResult.value,
    isNew: Boolean(rowResult?.lastErrorObject?.upserted),
  };
};

export const deleteClient = (filter) => {
  return ClientCollection.findOneAndDelete(filter);
};
