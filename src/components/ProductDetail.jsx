import React, { useEffect, useState } from 'react';
import ProductUpdate from './ProductUpdate';
import { getProductById } from '../services/productService';
import { formatDate } from '../utils/helpers';

const ProductDetail = ({ id }) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const fetchedProduct = await getProductById(id);
      setProduct(fetchedProduct);
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>Category: {product.category.name}</p>
      <p>Entry Date: {formatDate(product.entryDate)}</p>
      <p>Quantity: {product.quantity}</p>
      <ProductUpdate product={product} />
    </div>
  );
};

export default ProductDetail;