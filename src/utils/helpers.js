export const formatDate = (dateString) => {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', options);
};

export const validateProductName = (name) => {
  return name.length > 0 && name.length <= 100;
};

export const validateQuantity = (quantity) => {
  return Number.isInteger(quantity) && quantity > 0;
};

export const validateCategory = (category) => {
  return category.length > 0;
};