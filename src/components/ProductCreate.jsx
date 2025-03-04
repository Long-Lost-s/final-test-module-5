import React, { useState } from 'react';
import { validateProductName, validateQuantity, validateCategory } from '../utils/helpers';

const ProductCreate = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [entryDate, setEntryDate] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleCreate = async (e) => {
    e.preventDefault();
    
    if (!validateProductName(name) || !validateQuantity(quantity) || !validateCategory(category)) {
      alert('Vui lòng kiểm tra lại thông tin nhập');
      return;
    }

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          category,
          entryDate,
          quantity: parseInt(quantity),
        }),
      });

      if (!response.ok) {
        throw new Error('Có lỗi xảy ra khi thêm sản phẩm');
      }

      alert('Thêm sản phẩm thành công!');
      // Reset form
      setName('');
      setCategory('');
      setEntryDate('');
      setQuantity('');
    } catch (error) {
      alert('Lỗi: ' + error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Thêm Sản Phẩm Mới</h2>
      <form onSubmit={handleCreate} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tên sản phẩm:
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Danh mục:
          </label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ngày nhập:
          </label>
          <input
            type="date"
            value={entryDate}
            onChange={(e) => setEntryDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Số lượng:
          </label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="0"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Thêm Sản Phẩm
        </button>
      </form>
    </div>
  );
};

export default ProductCreate; 