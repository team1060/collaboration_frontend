import axiosInstance from "../axiosInstance";


/**
 * 회원 페이지 api 모음
 */

// member 전체 조회 
export const getAllMembers = async () => {
    try {
        const response = await axiosInstance.get("member/join")
        return response.data;
    } catch (error) {
        throw error;
    }
}