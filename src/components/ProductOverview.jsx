import React, { useEffect, useState } from 'react';
import Link from 'next/link';
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
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Quản lý Sản phẩm</h1>
        <Link
          href="/products/create"
        >
          Thêm sản phẩm
        </Link>
      </div>
      <ProductList products={products} />
    </div>
  );
};

export default ProductOverview;