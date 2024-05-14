import axiosAdmin from "../adminAxios.js";
// 상품 추가
export const postProduct = async (productData, imageFiles) => {
  try {
    const formData = new FormData();

    // 기본 상품 정보를 formData에 추가
    formData.append("brand_no", productData.brand_no);
    formData.append("product", productData.product);
    formData.append("price", productData.price);
    formData.append("discount", productData.discount);
    formData.append("benefit", productData.benefit);
    formData.append(
      "no_interest_installment",
      productData.no_interest_installment
    );
    formData.append("is_shop_pickup", productData.is_shop_pickup ? 1 : 0); // Checkbox 값이 boolean일 수 있으므로 int로 변환
    formData.append("is_shop_delivery", productData.is_shop_delivery ? 1 : 0);
    formData.append("name", productData.name); // 추가된 상품 옵션 이름
    formData.append("count", productData.count); // 추가된 상품 옵션 수량
    // 이미지 파일을 formData에 추가
    imageFiles.forEach((file) => {
      formData.append("images", file); // 'images'라는 이름으로 파일을 추가
    });

    // axios를 사용하여 백엔드에 POST 요청
    const response = await axiosAdmin.post(
      "/api/admin/products/insert",
      formData,
      {}
    );

    return response.data; // 백엔드 응답 반환
  } catch (error) {
    console.error("상품 등록에 실패하였습니다:", error);
    throw error; // 에러를 상위 호출자에게 전파
  }
};

// 상품 수정 (예시 함수, 실제 API 경로와 매개변수는 백엔드 API에 따라 다를 수 있음)
export const updateProduct = async (product_no, productData) => {
  try {
    const formData = new FormData();
    for (const key in productData) {
      formData.append(key, productData[key]);
    }
    const response = await axiosAdmin.put(
      `/admin/products/${product_no}`,
      formData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 상품목록
export const getProductList = async () => {
  try {
    const response = await axiosAdmin.get("/product");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 브랜드목록
export const getBrand = async () => {
  try {
    const response = await axiosAdmin.get("/brand");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 상품목록
export const getProductInner = async (product_no) => {
  try {
    const response = await axiosAdmin.get(`/products/${product_no}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 상품 삭제

export const deleteProduct = async () => {
  try {
  } catch (error) {
    throw error;
  }
};
