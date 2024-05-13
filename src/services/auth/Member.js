
import axiosInstance from "../axiosInstance";
import axios from "axios";

/**
 * 회원 페이지 api 모음 , jwtDecode
 */
const baseURL = process.env.REACT_APP_BASE_URL;
// const baseURL = 'http://localhost:8081';
const ACCESS_TOKEN = localStorage.getItem('ACCESS_TOKEN')


const axiosAuth = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': ACCESS_TOKEN ? `Bearer ${ACCESS_TOKEN}` : ''
    }
})

// member 전체 조회 
export const getAllMembers = async () => {
    try {
        const response = await axiosInstance.get("/member/join")
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const registerMember = async (userData) => {
    try {
        const response = await axiosInstance.post("/member/join", userData)
        return response.data;
    } catch (error) {
        throw error;
    }
}

// 비밀번호 찾기  
export const pwSubmit = async (email) => {
    try {
        const response = await axiosInstance.post("/member/login/email", email)
        return response.data;
    } catch (error) {
        throw error;
    }
}

// 이메일 전송 
export const emailSubmit = async (inputValue) => {
    try {
        const response = await axiosInstance.post("/member/login/email", { email: inputValue })
        return response.data;
    } catch (error) {
        throw error;
    }
}

// 인증 확인 
export const getEmail = async () => {
    try {
        const response = await axiosInstance.get("/member/join/login/email")
        return response.data;
    } catch (error) {
        throw error;
    }
}

// 로그인 
export const loginMember = async (userData) => {
    try {
        const response = await axiosAuth.post("/member/login", userData)
        console.log(response.data.token);
        if (response.data.token) {
            const token = response.data.token;
            localStorage.setItem("ACCESS_TOKEN", token);
            window.location.href = "/"
        }
    } catch (error) {
        throw error;
    }
}

// 이메일로 닉네임 조회
export const getNickname = async (email) => {
    try {
        const response = await axiosAuth.post(`/member/getEmail/${email}`, email)
        return response.data;
    } catch (error) {
        throw error;
    }
}

// 아이디 비밀번호 찾기 
export const sendUserData = async (data) => {
    try {
        const response = await axiosInstance.post("/member/find", data)
        return response.data;
    } catch (error) {
        throw error;
    }
}

// 비밀번호 변경
export const sendPwData = async (data) => {
    try {
        const response = await axiosInstance.post("/member/modify/pw", data)
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const isAdmin = async (email) => {
    try {
        const response = await axiosInstance.get(`/member/isAdmin?email=${email}`, email)
        return response.data;
    } catch (error) {
        throw error;
    }
}

// 탈퇴 회원 전체 조회 
export const getUserDelData = async() => {
    try {
        const response = await axiosInstance.get('/member/deljoin')
        console.log(response);
        return response.data;
    } catch (error) {
        throw error;
    }
}