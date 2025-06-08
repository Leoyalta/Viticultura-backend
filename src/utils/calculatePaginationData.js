const calculatePaginationData = ({ count, per_page, page }) => {
  const totalPages = Math.ceil(count / per_page);
  const hasNextPage = page < totalPages;
  const hasPreviousPage = page !== 1;
  return { totalPages, hasNextPage, hasPreviousPage };
};
export default calculatePaginationData;
