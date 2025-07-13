const parseOrdersFilterParams = (query = {}) => {
  const { client, product, plantingRequested, plantingDate } = query;

  const filter = {};

  if (client) filter.client = client;
  if (product) filter.product = product;

  if (plantingRequested !== undefined) {
    filter.plantingRequested = plantingRequested === 'true';
  }

  if (plantingDate) {
    filter.plantingDate = new Date(plantingDate);
  }

  return filter;
};

export default parseOrdersFilterParams;
