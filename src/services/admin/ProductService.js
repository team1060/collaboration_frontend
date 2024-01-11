
import axiosAdmin from "../adminAxios.js";
// 상품 추가
export const postProduct = async (productData) => {
  try {
    const formData = new FormData();
    for (const key in productData) {
      formData.append(key, productData[key]);
    }
    // 파일 추가 예시
    // productData.files.forEach(file => {
    //   formData.append('images', file);
    // });
    const response = await axiosAdmin.post("/admin/products/insert", formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 상품 수정 (예시 함수, 실제 API 경로와 매개변수는 백엔드 API에 따라 다를 수 있음)
export const updateProduct = async (product_no, productData) => {
  try {
    const formData = new FormData();
    for (const key in productData) {
      formData.append(key, productData[key]);
    }
    const response = await axiosAdmin.put(`/admin/products/${product_no}`, formData);
    return response.data;
  } catch (error) {
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