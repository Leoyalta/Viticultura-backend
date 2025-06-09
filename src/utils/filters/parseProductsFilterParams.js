import { normalizeFilterString } from './normalizeFilter.js';
const parseProductsFilterParams = (query = {}) => {
  const { variety, pie, isAvailable, code } = query;

  const filter = {};

  if (normalizeFilterString(variety)) filter.variety = variety;
  if (pie) filter.pie = pie;
  if (code) filter.code = code;
  if (isAvailable !== undefined) {
    filter.isAvailable = isAvailable === 'true';
  }

  return filter;
};

export default parseProductsFilterParams;
