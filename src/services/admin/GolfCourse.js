import axiosAdmin from "../adminAxios.js";
// 관리자 코스 등록 수정 삭제 


  // 코스 전체 조회 데이터 가져오기
  export const getCourse = async () => {
    try{
        const response = await axiosAdmin.get("/admin/course"); // 이름은 같다는 가정하에 
        return response.data;
    } catch (error) {
        console.log(error)
        // if(error.response.status === 403) {
        //     window.location.href="/";
        // }
        throw error;
    }
}

// 골프장 이름 데이터 가져오기
export const fetchGolfNames = async () => {
  try {
    const response = await axiosAdmin.get("/golf");
    return response.data;
  } catch (error) {
    console.error( error);
    throw error;
  }
};

 // 코스 등록
export const postCourse = async (course) => {
  try {
    const response = await axiosAdmin.post("/admin/course", course);
    return response.data;
  } catch (error) {
    console.error("Error posting course", error);
    throw error;
  }
};

// 코스 수정
export const updateCourse = async (course_no, course) => {
  try {
    console.log("코스")
    const response = await axiosAdmin.put(`/admin/course/${course_no}`, course);
    console.log("코스2")
    return response.data;
  } catch (error) {
    console.error("Error updating course", error);
    throw error;
  }
};

// 코스 삭제
export const deleteCourse = async (course_no) => {
  try {
    const response = await axiosAdmin.delete(`/admin/course/${course_no}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting course", error);
    throw error;
  }
};
// 단일 코스 조회
export const getSingleCourse = async (course_no) => {
  try {
    const response = await axiosAdmin.get(`/admin/course/${course_no}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching single course", error);
    throw error;
  }
};
