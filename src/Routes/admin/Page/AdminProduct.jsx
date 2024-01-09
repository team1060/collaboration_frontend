import React, { useState, useEffect } from 'react';
import { TextField, Button, FormControl } from '@mui/material';
import { getProductInner as getProduct } from '../../../services/admin/ProductService';
import '../Style/AdminGlobal.scss';

const AdminProduct = ({ product_no }) => {
  const [productData, setProductData] = useState({
    // 초기 상태 설정
  });

  useEffect(() => {
    if (product_no) {
      fetchProductData(product_no);
    }
  }, [product_no]);

  const fetchProductData = async (product_no) => {
    const data = await getProduct(product_no);
    setProductData(data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleSubmit = async () => {
    // 상품 추가 또는 수정 로직
  };

  return (
    <FormControl>
      <TextField
        label="Product No"
        name="product_no"
        value={productData.product_no}
        onChange={handleChange}
      />
      {/* 추가 필드 구성 */}
      <Button onClick={handleSubmit}>저장</Button>
    </FormControl>
  );
};

export default AdminProduct;
