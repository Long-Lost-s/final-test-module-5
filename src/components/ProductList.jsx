import React from 'react';
import Link from 'next/link';
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';

const ProductList = ({ products }) => {
  return (
    <div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Entry Date</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.category.name}</td>
              <td>{product.entryDate}</td>
              <td>{product.quantity}</td>
              <td>
                <Link href={`/product/${product.id}`}>
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;