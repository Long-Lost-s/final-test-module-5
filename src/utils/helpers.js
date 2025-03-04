export const formatDate = (dateString) => {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', options);
};

export const validateProductName = (name) => {
  return name.length >= 3 && name.length <= 100;
};

export const validateQuantity = (quantity) => {
  const num = parseInt(quantity);
  return !isNaN(num) && num > 0;
};

export const validateCategory = (category) => {
  return category.length >= 2 && category.length <= 50;
};