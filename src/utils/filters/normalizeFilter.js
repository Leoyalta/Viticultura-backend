export const normalizeFilterString = (value) => {
  if (typeof value !== 'string') return;
  const trimmed = value.trim().toLowerCase();
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
};

export const parseInteger = (value) => {
  if (typeof value !== 'string') return;
  const parsedNumber = parseInt(value);
  if (Number.isNaN(parsedNumber)) return;
  return parsedNumber;
};
