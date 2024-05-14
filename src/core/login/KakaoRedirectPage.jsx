import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const KakaoRedirectPage = () => {
  const location = useLocation();

  const handleOAuthKakao = async (code) => {
    try {
      const response = await axios.get(
        `http://13.125.136.122:8080/oauth/login/kakao`,
        {
          params: {
            code: code,
            oauthServerType: "KAKAO",
          },
        }
      );
      const token = response.data;
      localStorage.setItem("ACCESS_TOKEN", token);

      window.location.href = "/";
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get("code");
    if (code) {
      // alert("CODE = " + code)
      handleOAuthKakao(code);
    }
  }, [location]);

  return <div></div>;
};

export default KakaoRedirectPage;
