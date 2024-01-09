
import axiosAdmin from "../adminAxios.js";
// 새로운 상품 추가
export const postProduct = async (productData) => {
  try {
    const response = await axiosAdmin.post("/admin/products", productData);
    return response.data;
  } catch (error) {
    console.error("Error posting product", error);
    throw error;
  }
};
// 상품목록 
export const getProductList = async () => {
  try {
      const response = await axiosAdmin.get("/product")
      return response.data;
  } catch (error) {
      throw error
  }
}

// 브랜드목록
export const getBrand = async () => {
  try {
      const response = await axiosAdmin.get("/brand")
      return response.data;
  } catch (error) {
      throw error
  }
}

// 상품목록 
export const getProductInner = async (product_no) => {
  try {
      const response = await axiosAdmin.get(`/products/${product_no}`)
      return response.data;
  } catch (error) {
      throw error
  }
}

// 상품 삭제

export const deleteProduct = async () => {
  try{

  } catch (error) {
    throw error
}
}