import axios from "axios";
/**
 * 회원 페이지 api 모음 , jwtDecode
 */

const baseURL = process.env.REACT_APP_BASE_URL;
// const baseURL = 'http://localhost:8081';
const ACCESS_TOKEN = localStorage.getItem("ACCESS_TOKEN");

const axiosAuth = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Authorization: ACCESS_TOKEN ? `Bearer ${ACCESS_TOKEN}` : "",
  },
});

// 마이페이지 로그인
export const MypageLogin = async (userData) => {
  try {
    const response = await axiosAuth.post("/member/mypage/login", userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 비밀번호 업데이트
export const PwUpdate = async (userData) => {
  try {
    const response = await axiosAuth.post("/member/mypage/modify", userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 닉네임 변경
export const NicknameUpdate = async (data) => {
  try {
    const response = await axiosAuth.put("/member/mypage/modify", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 탈퇴
export const removeMember = async (email, password) => {
  try {
    const response = await axiosAuth.delete(
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
    const response = await axiosAuth.get("/payment/paymentByMember", {
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
    const response = await axiosAuth.get("/payment/paymentByMemberCount", {
      params: { email },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
