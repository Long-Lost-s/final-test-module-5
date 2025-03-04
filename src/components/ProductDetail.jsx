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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
      <p className="mb-2">Category: {product.category.name}</p>
      <p className="mb-2">Entry Date: {formatDate(product.entryDate)}</p>
      <p className="mb-4">Quantity: {product.quantity}</p>
      <ProductUpdate product={product} />
    </div>
  );
};

export default ProductDetail;