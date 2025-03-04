import products from '../../db.json';

export const getProducts = async () => {
  return products;
};

export const getProductById = async (id) => {
  return products.find((product) => product.id === parseInt(id));
};

export const updateProduct = async (updatedProduct) => {
  const index = products.findIndex((product) => product.id === updatedProduct.id);
  if (index !== -1) {
    products[index] = updatedProduct;
  }
};