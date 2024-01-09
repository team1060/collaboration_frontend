import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { getProductList, deleteProduct } from '../../../services/admin/ProductService';
import '../Style/AdminGlobal.scss';

const AdminProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const data = await getProductList();
    setProducts(data);
  };

  const handleDelete = async () => {
    if (window.confirm('선택한 상품을 삭제하시겠습니까?')) {
      await Promise.all(selectedProducts.map(product_no => deleteProduct(product_no)));
      fetchProducts(); // 상품 목록 새로고침
    }
  };

  const columns = [
    { field: 'product_no', headerName: '상품 번호', width: 130 },
    { field: 'brand_no', headerName: '브랜드 번호', width: 130 },
    { field: 'product', headerName: '상품명', width: 200 },
    { field: 'price', headerName: '가격', width: 130 },
    { field: 'discount', headerName: '할인퍼센트', width: 130 },
    { field: 'regdate', headerName: '등록일', width: 130 },
    // 나머지 필드 추가...
  ];

  return (
    <div  className='AdminGlobal'>
      <h2>상품 목록</h2>
      <Button variant="contained" color="primary" onClick={handleDelete}>상품 삭제</Button>
      <div style={{ height: 700, width: '100%' }}>
      <DataGrid
              rows={products}
              columns={columns}
              pageSize={10}
              checkboxSelection
              getRowId={(row) => row.product_no}  // 여기서 각 행의 고유 ID를 'product_no'로 설정
              onSelectionModelChange={(newSelection) => {
                setSelectedProducts(newSelection);
              }}
            />
      </div>
    </div>
  );
};

export default AdminProductList;
