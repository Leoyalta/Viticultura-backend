import ProductCollection from '../db/models/Product.js';
import calculatePaginationData from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';
export const getAllProducts = async ({
  per_page,
  page,
  sortBy = 'code',
  sortOrder = SORT_ORDER[0],
  filter = {},
}) => {
  const skip = (page - 1) * per_page;

  const products = await ProductCollection.find(filter)
    .skip(skip)
    .limit(per_page)
    .sort({ [sortBy]: sortOrder });

  const count = await ProductCollection.countDocuments(filter);

  const paginationData = calculatePaginationData({ count, per_page, page });

  return {
    page,
    per_page,
    products,
    totalProducts: count,
    ...paginationData,
  };
};

export const getProduct = (id) => {
  return ProductCollection.findById(id);
};

export const addProduct = (payload) => {
  return ProductCollection.create(payload);
};

export const updateProduct = async (filter, data, options = {}) => {
  const rowResult = await ProductCollection.findOneAndUpdate(filter, data, {
    includeResultMetadata: true,
    ...options,
  });

  return {
    data: rowResult,
    isNew: Boolean(rowResult?.lastErrorObject?.upserted),
  };
};

export const deleteProduct = (filter) => {
  return ProductCollection.findOneAndDelete(filter);
};
