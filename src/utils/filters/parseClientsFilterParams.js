import { normalizeFilterString } from './normalizeFilter.js';

const parseClientsFilterParams = (query = {}) => {
  const filter = {};

  if (query.name) {
    filter.name = { $regex: normalizeFilterString(query.name), $options: 'i' };
  }

  if (query.secondName) {
    filter.secondName = {
      $regex: normalizeFilterString(query.secondName),
      $options: 'i',
    };
  }

  if (query.phone) {
    filter.phone = {
      $regex: normalizeFilterString(query.phone),
      $options: 'i',
    };
  }

  if (query.email) {
    filter.email = {
      $regex: normalizeFilterString(query.email),
      $options: 'i',
    };
  }

  return filter;
};
export default parseClientsFilterParams;
