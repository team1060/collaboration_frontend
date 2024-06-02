import { apiRequest } from "../request.js";

/**
 * 예약페이지 api 모음
 */

// 코스 전체조회
export const getCourse = async () => {
  try {
    const response = await apiRequest.get("/reservation/detail");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 골프장 이름 조회
export const getGolf = async () => {
  try {
    const response = await apiRequest.get("/reservation/golf");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 예약 신청
export const postGolf = async (course) => {
  try {
    const response = await apiRequest.post("/reservation/detail", course);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 예약 내역 불러오기 -이미 있음
export const getReserve = async (email) => {
  try {
    const response = await apiRequest.get(`/reservation/confirm/${email}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
// 예약 갯수 불러오기 - X
export const getReserveCount = async (email) => {
  try {
    const response = await apiRequest.get(`/reservation/confirmcount/${email}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 예약취소
export const cancelGolf = async (reserve_no) => {
  try {
    const response = await apiRequest.post(`/reservation/cancel/${reserve_no}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 취소 내역 불러오기 - 이미 있음
export const getCancelGolf = async (email) => {
  try {
    const response = await apiRequest.get(
      `/reservation/confirm/cancel/${email}`
    );
    console.log(response);
    return response.data;
  } catch (error) {
    throw error;
  }
};
