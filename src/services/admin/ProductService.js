import axiosInstance from "../axiosInstance.js";

// 새로운 상품 추가
export const postProduct = async (productData) => {
  try {
    const response = await axiosInstance.post("/admin/products", productData);
    return response.data;
  } catch (error) {
    console.error("Error posting product", error);
    throw error;
  }
};

// 모든 상품 목록 조회
export const fetchProducts = async () => {
  try {
    const response = await axiosInstance.get("/product");
    return response.data;
  } catch (error) {
    console.error("Error fetching products", error);
    throw error;
  }
};

// 특정 상품 상세 조회
export const fetchProductById = async (productNo) => {
  try {
    const response = await axiosInstance.get(`/product/${productNo}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product", error);
    throw error;
  }
};
