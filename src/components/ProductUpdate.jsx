import React, { useState } from 'react';
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
      alert('Invalid input');
      return;
    }

    const updatedProduct = { ...product, name, category, entryDate, quantity };
    await updateProduct(updatedProduct);
    alert('Product updated successfully');
  };

  return (
    <div>
      <h2>Update Product</h2>
      <form onSubmit={handleUpdate}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Category:</label>
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
        </div>
        <div>
          <label>Entry Date:</label>
          <input type="date" value={entryDate} onChange={(e) => setEntryDate(e.target.value)} />
        </div>
        <div>
          <label>Quantity:</label>
          <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default ProductUpdate;