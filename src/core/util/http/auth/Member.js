import axios from "axios";
import { apiRequest } from "../request";
import { API_URL } from "../urls";

/**
 * 회원 페이지 api 모음 , jwtDecode
 */
// const baseURL = process.env.REACT_APP_BASE_URL;
// // const baseURL = 'http://localhost:8081';
// const ACCESS_TOKEN = localStorage.getItem("ACCESS_TOKEN");

// const axiosAuth = axios.create({
//   baseURL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// export const golfAPI = async (
//   api,
//   method,
//   params,
//   headers = {
//     "Content-Type": "application/json",
//     Authorization: ACCESS_TOKEN ? `Bearer ${ACCESS_TOKEN}` : "",
//   }
// ) => {
//   try {
//     const response = await axios({
//       method: method,
//       url: baseURL + api,
//       headers: headers,
//       data: params,
//     });
//     return response;
//   } catch (error) {
//     throw error;
//   }
// };

// export const insertQNA = async (formData) => {
//   try {
//     const response = await apiRequest.post("/board/QnaInsert", formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// member 전체 조회

export const getAllMembers = async () => {
  try {
    const response = await apiRequest.get(API_URL.MEMBER_LIST_GET);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 비밀번호 찾기
export const pwSubmit = async (email) => {
  try {
    const response = await apiRequest.post(API_URL.PW_SUBMIT, email);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 이메일 전송
export const emailSubmit = async (inputValue) => {
  try {
    const response = await apiRequest.post(API_URL.EMAIL_SUBMIT, {
      email: inputValue,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 인증 확인
export const getEmail = async () => {
  try {
    const response = await apiRequest.get(API_URL.EMAIL_GET);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 회원가입
export const signUp = async (userData) => {
  try {
    const response = await apiRequest.post(API_URL.SIGNUP, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 로그인
export const siginIn = async (userData) => {
  try {
    const response = await apiRequest.post(API_URL.SIGNIN, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 이메일로 닉네임 조회
export const getNickname = async (email) => {
  try {
    const response = await apiRequest.post(API_URL.NICKNAME_GET, email);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 아이디 비밀번호 찾기
export const sendUserData = async (data) => {
  try {
    const response = await apiRequest.post(API_URL.MEMBER_SEND, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 비밀번호 변경
export const sendPwData = async (data) => {
  try {
    const response = await apiRequest.post(API_URL.PW_SEND, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const isAdmin = async (email) => {
  try {
    const response = await apiRequest.get(API_URL.IS_ADMIN, email);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 탈퇴 회원 전체 조회
export const getUserDelData = async () => {
  try {
    const response = await apiRequest.get(API_URL.DEL_MEMBER_GET);
    return response.data;
  } catch (error) {
    throw error;
  }
};
