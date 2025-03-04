import React, { useEffect, useState } from 'react';
import ProductList from './ProductList';
import { getProducts } from '../services/productService';

const ProductOverview = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Product Overview</h1>
      <ProductList products={products} />
    </div>
  );
};

export default ProductOverview;