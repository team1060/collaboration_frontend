import { jwtDecode } from "jwt-decode";
import { apiRequest } from "../util/http/request";
import { API_URL } from "../util/http/urls";

const login = async (userData) => {
  try {
    const response = await apiRequest.post(API_URL.SIGNIN, userData);
    window.location.href = "/";
    console.log(response);
    const { accessToken, email } = response.data;
    localStorage.setItem("key", accessToken);
    localStorage.setItem("email", email);
    localStorage.setItem("nickname", jwtDecode(accessToken).nickname);
  } catch (error) {
    console.log("error", error);
  }
};

const logout = async () => {
  console.log("logout");
  const email = localStorage.getItem("email");
  console.log(email);
  const logoutUrl = `${API_URL.LOGOUT}?email=${encodeURIComponent(email)}`;
  try {
    const response = await apiRequest.post(logoutUrl);
    console.log(response);
    localStorage.removeItem("key");
    localStorage.removeItem("email");
    localStorage.removeItem("nickname");
    isLogin()
    window.location.href = "/";
  } catch (error) {
    console.log(error);
  } finally {
    
  }
};

const isLogin = () => {
  const token = localStorage.getItem("key") ? localStorage.getItem("key") : '';
  if(token !== '') {
    const decodeToken = jwtDecode(token);
    // 일단 이메일로만 검증
    const email = localStorage.getItem("email")
    console.log(token);
    if (decodeToken.email === email) {
      console.log("isLogin : true", decodeToken.email? decodeToken.email : '' )
      console.log("isLogin : true", email ? email : '')
      console.log("true");
      return true;
    }
  }
  console.log("false");
  return false;
};

export { login, logout, isLogin };
