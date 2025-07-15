import createHttpError from 'http-errors';
import * as orderService from '../services/order.js';
import parsePaginationParams from '../utils/parsePaginationParams.js';
import parseSortParams from '../utils/parseSortParams.js';
import { sortFields } from '../db/models/Product.js';
import parseOrdersFilterParams from '../utils/filters/parseOrdersFilterParams.js';

export const getAllOrdersController = async (req, res) => {
  const { per_page, page } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams({ ...req.query, sortFields });
  const filter = parseOrdersFilterParams(req.query);

  const data = await orderService.getAllOrders({
    per_page,
    page,
    sortBy,
    sortOrder,
    filter,
  });
  res.json({
    status: 200,
    message: 'Successfully founded orders',
    data,
  });
};

export const getOrderByIdController = async (req, res) => {
  const { id } = req.params;
  const order = await orderService.getOrder(id);

  if (!order) {
    throw createHttpError(404, `Order with id:${id} does not exist`);
  }

  res.json({
    status: 200,
    message: `Order with id:${id} is found`,
    order,
  });
};

export const addOrderController = async (req, res) => {
  const data = await orderService.addOrder(req.body);

  res.json({
    status: 201,
    message: 'Order created',
    data,
  });
};

export const upsertOrderController = async (req, res) => {
  const { id } = req.params;

  const { isNew, data } = await orderService.updateOrder(
    { _id: id },
    req.body,
    { upsert: true },
  );

  const status = isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: isNew ? 'Order created (upserted)' : 'Order updated',
    newOrder: isNew,
    data: data.value,
  });
};

export const updateOrderController = async (req, res) => {
  const { id } = req.params;

  const result = await orderService.updateOrder({ _id: id }, req.body);

  if (!result?.data) {
    throw createHttpError(404, `Order with id:${id} does not exist`);
  }

  res.status(200).json({
    status: 200,
    message: 'Order updated successfully',
    data: result.data.value,
  });
};

export const deleteOrderController = async (req, res) => {
  const { id } = req.params;

  const deletedOrder = await orderService.deleteOrder({ _id: id });

  if (!deletedOrder) {
    throw createHttpError(404, `Order with id:${id} not found`);
  }

  res.status(204).send();
};
