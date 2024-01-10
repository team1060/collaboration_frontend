import axiosInstance from "../axiosInstance"

// 상품목록 
export const postPayment = async () => {
    try {
        const response = await axiosInstance.post("")
        return response.data;
    } catch (error) {
        throw error
    }
}

// 브랜드목록
export const getBrand = async () => {
    try {
        const response = await axiosInstance.post("")
        return response.data;
    } catch (error) {
        throw error
    }
}

// 상품목록 
export const getProductInner = async () => {
    try {
        const response = await axiosInstance.post("")
        return response.data;
    } catch (error) {
        throw error
    }
}