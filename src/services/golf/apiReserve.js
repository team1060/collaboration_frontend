import axiosInstance from "../axiosInstance.js";
import axios from "axios";
/**
 * 예약페이지 api 모음 
 */

const baseURL = 'http://localhost:8081/api';
const ACCESS_TOKEN = localStorage.getItem('ACCESS_TOKEN')


const axiosAuth = axios.create({
    baseURL,
    headers: {
        'Content-Type' : 'application/json',
        'Authorization' : ACCESS_TOKEN ? `Bearer ${ACCESS_TOKEN}`:''
    }
})

// 코스 전체조회
export const getCourse = async () => {
    try{
        const response = await axiosAuth.get("/reservation/detail");
        return response.data;
    } catch (error) {
        console.log(error)
        // if(error.response.status == 403) {
        //     window.location.href="/";
        // }
        throw error;
    }
}

// 골프장 이름 조회 
export const getGolf = async () => {
    try {
        const response = await axiosAuth.get("/admin/golf");
        return response.data;
    } catch (error) {
        throw error;
    }
}

// 예약 신청 
export const postGolf = async (course) => {
    try {
        const response = await axiosAuth.post("/reservation/detail", course);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// 예약 내역 불러오기 
export const getReserve = async (email) => {
    try {
        const response = await axiosAuth.get(`/reservation/confirm/${email}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}