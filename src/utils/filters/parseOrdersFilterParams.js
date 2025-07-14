const parseOrdersFilterParams = (query = {}) => {
  const { client, product, plantingRequested, plantingDate, status } = query;

  const filter = {};

  if (client) filter.client = client;
  if (product) filter.product = product;

  if (plantingRequested !== undefined) {
    filter.plantingRequested = plantingRequested === 'true';
  }

  if (plantingDate) {
    filter.plantingDate = new Date(plantingDate);
  }
  if (status) filter.status = status;

  return filter;
};

export default parseOrdersFilterParams;
