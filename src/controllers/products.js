import createHttpError from 'http-errors';
import * as productsService from '../services/product.js';
import parsePaginationParams from '../utils/parsePaginationParams.js';
import parseSortParams from '../utils/parseSortParams.js';
import { sortFields } from '../db/models/Product.js';
import parseProductsFilterParams from '../utils/filters/parseProductsFilterParams.js';

export const getAllProducatsController = async (req, res) => {
  const { per_page, page } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams({ ...req.query, sortFields });
  const filter = parseProductsFilterParams(req.query);

  const data = await productsService.getAllProducts({
    per_page,
    page,
    sortBy,
    sortOrder,
    filter,
  });

  res.json({
    status: 200,
    message: 'Successfully founded products',
    data,
  });
};

export const getProductByIdController = async (req, res) => {
  const { id } = req.params;
  const product = await productsService.getProduct(id);

  if (!product) {
    throw createHttpError(404, `Product with id:${id} does not exist`);
  }

  res.json({
    status: 200,
    message: `Product with id:${id} is found`,
    product,
  });
};

export const addProductController = async (req, res) => {
  const data = await productsService.addProduct(req.body);

  res.json({
    status: 201,
    message: 'Product created',
    data,
  });
};

export const upsertProductController = async (req, res) => {
  const { id } = req.params;
  const { isNew, data } = await productsService.updateProduct(
    { _id: id },
    req.body,
    {
      upsert: true,
    },
  );

  const status = isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: 'Product upsert successfully',
    newProduct: isNew,
    data: data.value,
  });
};

export const updateProductController = async (req, res) => {
  const { id } = req.params;
  const result = await productsService.updateProduct({ _id: id }, req.body);

  if (!result?.data.value) {
    throw createHttpError(404, `Product with id:${id} does not exist`);
  }

  res.json({
    status: 200,
    message: 'Product updated successfully ',
    data: result.data.value,
  });
};

export const deleteProductController = async (req, res) => {
  const { id } = req.params;
  const data = await productsService.deleteProduct({ _id: id });

  if (!data) {
    throw createHttpError(404, `Product with id:${id} does not exist`);
  }

  res.status(204).send();
};
