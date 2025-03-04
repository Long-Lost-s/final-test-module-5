import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import ProductList from './ProductList';
import { getProducts } from '../services/productService';

const ProductOverview = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Quản lý Sản phẩm</h1>
        <div>
          <input
            type="text"
            placeholder="Nhập tên sản phẩm cần tìm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div>
        <Link href="/products/create">
          Thêm sản phẩm
        </Link>
      </div>
      <ProductList products={filteredProducts} />
    </div>
  );
};

export default ProductOverview;