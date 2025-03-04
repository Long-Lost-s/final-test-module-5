import React, { useState } from 'react';
import Link from 'next/link';
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
    <div>
      <div style={{ marginBottom: '20px' }}>
        <Link href="/">
          ← Quay lại danh sách
        </Link>
      </div>

      <h2>Thêm Sản Phẩm Mới</h2>
      <form onSubmit={handleCreate}>
        <div>
          <label>Tên sản phẩm:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Danh mục:</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Ngày nhập:</label>
          <input
            type="date"
            value={entryDate}
            onChange={(e) => setEntryDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Số lượng:</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min="0"
            required
          />
        </div>
        <div style={{ marginTop: '20px' }}>
          <button type="submit">Thêm sản phẩm</button>
          <Link href="/" style={{ marginLeft: '10px' }}>
            Hủy
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ProductCreate;