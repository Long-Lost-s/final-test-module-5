import React, { useState } from 'react';
import Link from 'next/link';
import { updateProduct } from '../services/productService';
import { validateProductName, validateQuantity, validateCategory } from '../utils/helpers';

const ProductUpdate = ({ product }) => {
  const [name, setName] = useState(product.name);
  const [category, setCategory] = useState(product.category.name);
  const [entryDate, setEntryDate] = useState(product.entryDate);
  const [quantity, setQuantity] = useState(product.quantity);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!validateProductName(name) || !validateQuantity(quantity) || !validateCategory(category)) {
      alert('Vui lòng kiểm tra lại thông tin nhập');
      return;
    }

    const updatedProduct = { ...product, name, category, entryDate, quantity };
    await updateProduct(updatedProduct);
    alert('Cập nhật sản phẩm thành công');
  };

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <Link href="/">
          ← Quay lại danh sách
        </Link>
      </div>

      <h2>Cập nhật Sản phẩm</h2>
      <form onSubmit={handleUpdate}>
        <div>
          <label>Tên sản phẩm:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Danh mục:</label>
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
        </div>
        <div>
          <label>Ngày nhập:</label>
          <input type="date" value={entryDate} onChange={(e) => setEntryDate(e.target.value)} />
        </div>
        <div>
          <label>Số lượng:</label>
          <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        </div>
        <div style={{ marginTop: '20px' }}>
          <button type="submit">Cập nhật</button>
          <Link href="/" style={{ marginLeft: '10px' }}>
            Hủy
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ProductUpdate;