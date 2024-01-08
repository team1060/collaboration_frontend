
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
        'Content-Type' : 'application/json',
        'Authorization' : ACCESS_TOKEN ? `Bearer ${ACCESS_TOKEN}`:''
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
    } catch (error){
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
        const response = await axiosAuth.post("api/member/login", userData)
        console.log(response.data.token);
        if (response.data.token) {
            const token = response.data.token;
            localStorage.setItem("ACCESS_TOKEN", token);
            window.location.href="/"
        }
    } catch (error) {
        throw error;
    }
}

// 이메일로 닉네임 조회
export const getNickname = async (email) => {
    try{
        const response = await axiosAuth.post(`api/member/getEmail/${email}`, email)
        return response.data;
    } catch (error){
        throw error;
}
}