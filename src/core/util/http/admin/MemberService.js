import { apiRequest } from "../request.js";
import { API_URL } from "../urls.js";

/**
 * 회원 페이지 api 모음 , jwtDecode
 */
// const baseURL = process.env.REACT_APP_BASE_URL;
// // const baseURL = 'http://localhost:8081';
// const ACCESS_TOKEN = localStorage.getItem('ACCESS_TOKEN')

// const axiosAuth = axios.create({
//     baseURL,
//     headers: {
//         'Content-Type' : 'application/json',
//         'Authorization' : ACCESS_TOKEN ? `Bearer ${ACCESS_TOKEN}`:''
//     }
// })

// 회원 전체 조회
export const getAllMembers = async () => {
  try {
    const response = await apiRequest.get(API_URL.MEMBER_LIST_GET);
    return response.data;
  } catch (error) {
    console.error("Error fetching members", error);
    throw error;
  }
};

// 회원 등록
export const registerMember = async (memberData) => {
  try {
    const response = await apiRequest.post(API_URL.MEMBER_POST, memberData);
    return response.data;
  } catch (error) {
    console.error("Error registering member", error);
    throw error;
  }
};

// 회원 정보 수정
export const updateMember = async (email, memberData) => {
  try {
    const response = await apiRequest.put(
      API_URL.MEMBER_PUT(email),
      memberData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating member", error);
    throw error;
  }
};

// 회원 삭제 (추가적인 API 엔드포인트 필요)
export const deleteMember = async (email) => {
  try {
    const response = await apiRequest.delete(API_URL.MEMBER_DELETE(email));
    return response.data;
  } catch (error) {
    console.error("Error deleting member", error);
    throw error;
  }
};

// 회원에게 권한 부여 (추가적인 API 엔드포인트 필요)
export const grantPermission = async (email, permissions) => {
  try {
    const response = await apiRequest.post(
      API_URL.AUTH_PUT,
      permissions
    );
    return response.data;
  } catch (error) {
    console.error("Error granting permissions", error);
    throw error;
  }
};
