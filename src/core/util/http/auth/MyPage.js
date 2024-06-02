/**
 * 회원 페이지 api 모음 , jwtDecode
 */

import { apiRequest } from "../request";
import { API_URL } from "../urls";

// 마이페이지 로그인
export const MypageLogin = async (userData) => {
  try {
    const response = await apiRequest.post(API_URL.MYPAGE_SIGNIN, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 비밀번호 업데이트
export const PwUpdate = async (userData) => {
  try {
    const response = await apiRequest.post(API_URL.PW_PUT, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 닉네임 변경
export const NicknameUpdate = async (data) => {
  try {
    const response = await apiRequest.put(API_URL.NICKNAME_PUT, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 탈퇴
export const removeMember = async (email, password) => {
  try {
    const response = await apiRequest.delete(
      `/member/mypage/login/remove/${email}`,
      {
        data: { password },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const orderHistory = async (email) => {
  try {
    const response = await apiRequest.get(API_URL.PAYMENT_LIST_GET, {
      params: { email },
    });
    console.log(email);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getpaymentByMemberCount = async (email) => {
  try {
    const response = await apiRequest.get(API_URL.PAYMENT_LIST_COUNT_GET, {
      params: { email },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
