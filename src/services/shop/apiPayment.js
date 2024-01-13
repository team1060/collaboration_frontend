import axiosInstance from "../axiosInstance"

// 주문상품 
export const postPayment = async (payment) => {
    try {
        const response = await axiosInstance.post("/payment/pay", payment)
        return response.data;
    } catch (error) {
        throw error
    }   
}

// 주문상품-옵션
export const postPaymentOptions = async (options) => {
    try {
        const response = await axiosInstance.post("/payment/options", options)
        return response.data;
    } catch (error) {
        throw error
    }
}

// 배송지
export const postShipping = async (shipping) => {
    try {
        const response = await axiosInstance.post("/shipping/shipping", shipping)
        return response.data;
    } catch (error) {
        throw error
    }
}

// 배송지 PK 받아오기
export const getMaxShippingNo = async () => {
    try {
        const response = await axiosInstance.get("/shipping/shippingno")
        return response.data;
    } catch (error) {
        throw error
    }
}

// 주문상품 PK 받아오기
export const getMaxPaymentNo = async () => {
    try {
        const response = await axiosInstance.get("/payment/paymentno")
        return response.data;
    } catch (error) {
        throw error
    }
}