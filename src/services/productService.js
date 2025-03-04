import data from '../../db.json';

export const getProducts = async () => {
  return data.products;
};

export const getCategories = async () => {
  return data.categories;
};

export const getProductById = async (id) => {
  return data.products.find((product) => product.id === parseInt(id));
};

export const updateProduct = async (updatedProduct) => {
  const index = data.products.findIndex((product) => product.id === updatedProduct.id);
  if (index !== -1) {
    data.products[index] = updatedProduct;
    return updatedProduct;
  }
  throw new Error('Không tìm thấy sản phẩm');
};

export const createProduct = async (product) => {
  const newId = Math.max(...data.products.map(p => p.id)) + 1;
  const newProduct = {
    id: newId,
    ...product,
    entryDate: new Date(product.entryDate).toISOString().split('T')[0]
  };
  data.products.push(newProduct);
  return newProduct;
};