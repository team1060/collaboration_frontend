import axiosInstance from "../axiosInstance";


/**
 * 회원 페이지 api 모음
 */

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
// // 인증번호 get 
// export const getEmail = async () => {
//     try {
//         const response = await axiosInstance.get("/member/join/login/email")
//         return response.data;
//     } catch (error) {
//         throw error;
//     }
// }