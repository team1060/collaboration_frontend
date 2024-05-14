/**
 * 상품 목록 api
 */

import axiosInstance from "../axiosInstance";

// 상품목록
export const getProductList = async () => {
  try {
    const response = await axiosInstance.get("/product");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 브랜드목록
export const getBrand = async () => {
  try {
    const response = await axiosInstance.get("/brand");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 상품목록
export const getProductInner = async (product_no) => {
  try {
    const response = await axiosInstance.get(`/products/${product_no}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
