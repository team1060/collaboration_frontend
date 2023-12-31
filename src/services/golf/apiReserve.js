import axiosInstance from "../axiosInstance.js";

/**
 * 예약페이지 api 모음 
 */


// 코스 전체조회
export const getCourse = async () => {
    try{
        const response = await axiosInstance.get("/reservation/detail");
        return response.data;
    } catch (error) {
        console.log(error)
        // if(error.response.status == 403) {
        //     window.location.href="/";
        // }
        throw error;
    }
}



// 골프장 이름 조회 
export const getGolf = async () => {
    try {
        const response = await axiosInstance.get("/admin/golf");
        return response.data;
    } catch (error) {
        throw error;
    }
}

// 예약 신청 
export const postGolf = async (course) => {
    try {
        const response = await axiosInstance.post("/reservation/detail", course);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// 예약 내역 불러오기 
export const getReserve = async (email) => {
    try {
        const response = await axiosInstance.get(`/reservation/detail/${email}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}