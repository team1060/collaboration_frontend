import React, {useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios';

const KakaoRedirectPage = () => {
    const location = useLocation();

const handleOAuthKakao = async (code) => {
    try {
        const response = await axios.get(`http://localhost:8081/oauth/login/kakao`, {
            params: {
                code: code,
                oauthServerType: "KAKAO"
            }
        });
        const token = response.data;
        localStorage.setItem('accessToken', token);

        window.location.href = "/";
    } catch (error) {
        console.error(error);
    }
};

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const code = searchParams.get('code');
        if (code) {
            // alert("CODE = " + code)
            handleOAuthKakao(code);
        }
    }, [location]);

    return (
        <div>
           
        </div>
    );
};

export default KakaoRedirectPage;