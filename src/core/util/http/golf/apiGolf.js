import axiosInstance from "../axiosInstance";

export const getGolfInfo = async (golf_no) => {
  try {
    const response = await axiosInstance.get(`/golf/${golf_no}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getGolfByRegion = async (region) => {
  try {
    const response = await axiosInstance.get(`/golf/info/${region}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
