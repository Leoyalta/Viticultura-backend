import OrderCollection from '../db/models/Order.js';
import calculatePaginationData from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

export const getAllOrders = async ({
  per_page,
  page,
  sortBy = 'client',
  sortOrder = SORT_ORDER[0],
  filter = {},
}) => {
  const skip = (page - 1) * per_page;

  const orders = await OrderCollection.find(filter)
    .populate('client', 'name secondName phone')
    .populate('product', 'code variety pie')
    .skip(skip)
    .limit(per_page)
    .sort({ [sortBy]: sortOrder });

  const count = await OrderCollection.countDocuments(filter);

  const paginationData = calculatePaginationData({ count, per_page, page });

  return {
    page,
    per_page,
    orders,
    totalOrders: count,
    ...paginationData,
  };
};

export const getOrder = (id) => {
  return OrderCollection.findById(id);
};
export const addOrder = (payload) => {
  return OrderCollection.create(payload);
};

export const updateOrder = async (filter, data, options = {}) => {
  const rowResult = await OrderCollection.findOneAndUpdate(filter, data, {
    includeResultMetadata: true,
    ...options,
  });

  return {
    data: rowResult,
    isNew: Boolean(rowResult?.lastErrorObject?.upserted),
  };
};
export const deleteOrder = (filter) => {
  return OrderCollection.findOneAndDelete(filter);
};
