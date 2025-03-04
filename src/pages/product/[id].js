import React from 'react';
import { useRouter } from 'next/router';
import ProductDetail from '../../components/ProductDetail';

const ProductPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return <ProductDetail id={id} />;
};

export default ProductPage;