const parseInteger = (value, defaultValue) => {
  if (typeof value !== 'string') {
    return defaultValue;
  }
  const parsedValue = parseInt(value);

  if (Number.isNaN(parsedValue)) {
    return defaultValue;
  }

  return parsedValue;
};

const parsePaginationParams = ({ per_page, page }) => {
  const parsedPerPage = parseInteger(per_page, 20);
  const parsedPage = parseInteger(page, 1);

  return {
    per_page: parsedPerPage,
    page: parsedPage,
  };
};

export default parsePaginationParams;
