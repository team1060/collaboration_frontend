import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import {
  getProductList,
  deleteProduct,
  getBrand,
} from "../../../core/util/http/admin/ProductService";
import { useNavigate } from "react-router-dom";

const AdminProductList = () => {
  const navigate = useNavigate(); // 페이지 이동을 위한 훅
  const [products, setProducts] = useState([]);
  // const [brands, setBrands] = useState({});
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("product"); // 필터링할 카테고리 기본값

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const brandData = await getBrand();
    const brandMapping = {};
    brandData.forEach((brand) => {
      brandMapping[brand.brand_no] = brand.brand_name;
    });

    const productData = await getProductList();
    const transformedProducts = productData.map((product) => ({
      ...product,
      brand_name: brandMapping[product.brand_no] || "브랜드 없음",
    }));
    setProducts(transformedProducts);
  };

  // 상품 등록 버튼 핸들러
  const handleRegister = () => {
    navigate("/admin/product"); // 새 상품을 등록하는 경로로 이동
  };
  // 상품 수정 버튼 핸들러
  const handleEdit = () => {
    if (selectedProducts.length !== 1) {
      console.log(selectedProducts.length);
      console.log(selectedProducts);
      alert("하나의 상품만 선택해주세요.");
      return;
    }
    const productNo = selectedProducts[0];
    const selectedProduct = products.find(
      (product) => product.product_no === productNo
    );
    navigate(`/admin/product/${productNo}`, {
      state: { product: selectedProduct },
    });
  };

  const handleDelete = async () => {
    if (window.confirm("선택한 상품을 삭제하시겠습니까?")) {
      await Promise.all(
        selectedProducts.map((product_no) => deleteProduct(product_no))
      );
      fetchProducts(); // 상품 목록 새로고침
    }
  };

  const columns = [
    { field: "product_no", headerName: "상품 번호", width: 130 },
    { field: "brand_name", headerName: "브랜드 이름", width: 130 }, // 변경된 부분
    { field: "product", headerName: "상품명", width: 200 },
    {
      field: "price",
      headerName: "가격",
      width: 130,
      valueFormatter: (params) => {
        return params.value.toLocaleString("ko-KR") + " 원";
      },
    },
    {
      field: "discount",
      headerName: "할인퍼센트",
      width: 130,
      valueFormatter: (params) => {
        const discountPercent = (params.value * 100).toFixed(0); // 소수점 자리수 표현 .toFixed(2)
        return `${discountPercent}%`;
      },
    },
    {
      field: "regdate",
      headerName: "등록일",
      width: 200,
      valueGetter: (params) => params.row.regdate.split("T")[0],
    },
    // 나머지 필드 추가...
  ];

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  // 카테고리 필터링 핸들러
  const handleFilterCategoryChange = (event) => {
    setFilterCategory(event.target.value);
  };
  // 필터링된 데이터
  const filteredProducts = products.filter((product) => {
    const productValue = product[filterCategory]
      ? product[filterCategory].toString()
      : "";
    return productValue.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="AdminGlobal">
      <h2 style={{ textAlign: "center" }}>상품 목록</h2>

      <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
        <FormControl variant="outlined">
          <InputLabel id="filter-category-label">카테고리</InputLabel>
          <Select
            labelId="filter-category-label"
            id="filter-category"
            value={filterCategory}
            onChange={handleFilterCategoryChange}
            label="카테고리"
          >
            {/* 이름구간은 현재 상품에 맞게  */}
            <MenuItem value="product_no">상품 번호</MenuItem>
            <MenuItem value="brand_name">브랜드 이름</MenuItem>
            <MenuItem value="product">상품명</MenuItem>
            <MenuItem value="price">가격</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="검색"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ width: "400px" }}
        />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
        {/*  */}
        <Button variant="contained" color="primary" onClick={handleRegister}>
          상품 등록
        </Button>
        <Button variant="contained" color="primary" onClick={handleEdit}>
          상품 수정
        </Button>
        <Button variant="contained" color="primary" onClick={handleDelete}>
          상품 삭제
        </Button>
      </Box>

      <div style={{ height: 800, width: "100%" }}>
        <DataGrid
          rows={filteredProducts}
          columns={columns}
          pageSize={10}
          checkboxSelection
          getRowId={(row) => row.product_no}
          onRowSelectionModelChange={(newSelection) => {
            console.log("Selection Changed", newSelection);
            setSelectedProducts(newSelection);
          }}
        />
      </div>
    </div>
  );
};

export default AdminProductList;
