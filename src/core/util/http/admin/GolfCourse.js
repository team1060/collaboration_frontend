import { apiRequest } from "../request.js";
import { API_URL } from "../urls.js";
// 관리자 코스 등록 수정 삭제

// 코스 전체 조회 데이터 가져오기
export const getCourse = async () => {
  try {
    const response = await apiRequest.get(API_URL.COURSE_GET); // 이름은 같다는 가정하에
    return response.data;
  } catch (error) {
    console.log(error);
    if (error.response.status === 403) {
      window.location.href = "/";
    }
    throw error;
  }
};

// 골프장 이름 데이터 가져오기
export const fetchGolfNames = async () => {
  try {
    const response = await apiRequest.get(API_URL.GOLF_LIST_GET);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 코스 등록
export const postCourse = async (course) => {
  try {
    const response = await apiRequest.post(API_URL.COURSE_POST, course);
    return response.data;
  } catch (error) {
    console.error("Error posting course", error);
    throw error;
  }
};

// 코스 수정
export const updateCourse = async (course_no, course) => {
  try {
    console.log("코스");
    const response = await apiRequest.put(API_URL.COURSE_PUT(course_no), course);
    console.log("코스2");
    return response.data;
  } catch (error) {
    console.error("Error updating course", error);
    throw error;
  }
};

// 코스 삭제
export const deleteCourse = async (course_no) => {
  try {
    const response = await apiRequest.delete(API_URL.COURSE_DELETE(course_no));
    return response.data;
  } catch (error) {
    console.error("Error deleting course", error);
    throw error;
  }
};
// 단일 코스 조회
export const getSingleCourse = async (course_no) => {
  try {
    const response = await apiRequest.get(API_URL.COURSE_GET(course_no));
    return response.data;
  } catch (error) {
    console.error("Error fetching single course", error);
    throw error;
  }
};
