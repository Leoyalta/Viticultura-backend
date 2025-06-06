import ProductCollection from '../db/models/Product.js';

export const getAllProducts = () => {
  return ProductCollection.find();
};

export const getProduct = (id) => {
  return ProductCollection.findById(id);
};

export const addProduct = (payload) => {
  return ProductCollection.create(payload);
};

export const updateProduct = async (filter, data, options = {}) => {
  const rowResult = await ProductCollection.findOneAndUpdate(filter, data, {
    new: true,
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
