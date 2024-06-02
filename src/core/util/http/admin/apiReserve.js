/**
 * 예약페이지 api 모음
 */

import { apiRequest } from "../request";
import { API_URL } from "../urls";

// 코스 전체조회
export const getCourse = async () => {
  try {
    const response = await apiRequest.get(API_URL.COURSE_GET);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 골프장 이름 조회
export const getGolf = async () => {
  try {
    const response = await apiRequest.get(API_URL.GOLF_GET);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// // 예약 신청
// export const postGolf = async (course) => {
//     try {
//         const response = await apiRequest.postAPI_URL.COURSE_GET, course);
//         return response.data;
//     } catch (error) {
//         throw error;
//     }
// }

// 예약 내역 불러오기
export const getReserve = async (email) => {
  try {
    const response = await apiRequest.get(API_URL.RESERVE_GET);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 예약취소
export const cancelGolf = async (reserve_no) => {
  try {
    const response = await apiRequest.post(API_URL.RESERVE_CANCLE_POST(reserve_no));
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 취소 내역 불러오기
export const getCancelGolf = async (email) => {
  try {
    const response = await apiRequest.get(API_URL.RESERVE_CANCLE_GET(email))
    return response.data;
  } catch (error) {
    throw error;
  }
};
