import { jwtDecode } from "jwt-decode";
import { apiRequest } from "../util/http/request";
import { API_URL } from "../util/http/urls";
import { useCallback, useEffect, useState } from "react";

const useAuth = () => {
  const [userData, setUserData] = useState({});
  const [isLogin, setIsLogin] = useState(false);

  const login = async (userData) => {
    try {
      const response = await apiRequest.post(API_URL.SIGNIN, userData);
      console.log(response);
      const { accessToken, email } = response.data;
      localStorage.setItem("key", accessToken);
      localStorage.setItem("email", email);
      localStorage.setItem("nickname", jwtDecode(accessToken).nickname);
      // window.location.href = "/";
    } catch (error) {
      console.log("error", error);
      alert("로그인에 실패하였습니다.");
    } finally {
      window.location.href = "/";
    }
  };

  const logout = async () => {
    const email = localStorage.getItem("email");
    const logoutUrl = `${API_URL.LOGOUT}?email=${encodeURIComponent(email)}`;
    try {
      const response = await apiRequest.post(logoutUrl);
      console.log(response);
      localStorage.removeItem("key");
      localStorage.removeItem("email");
      localStorage.removeItem("nickname");
      setIsLogin(false);
      window.location.href = "/";
    } catch (error) {
      console.log(error);
    }
  };

  const loginCheck = useCallback(async () => {
    let result = false;
    const token = localStorage.getItem("key") || "";
    if (token !== "") {
      const decodeToken = jwtDecode(token);
      const email = localStorage.getItem("email");
      const nickname = localStorage.getItem("nickname");
      if (decodeToken.email === email) {
        const memberNo = decodeToken.memberNo;
        result = true;
        setUserData({ email: email, nickname: nickname, memberNo: memberNo });
      }
    }
    setIsLogin(result);
  }, []);

  useEffect(() => {
    loginCheck();
  }, [loginCheck]);

  return { login, logout, isLogin, loginCheck, userData };
};

export default useAuth;
