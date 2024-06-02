import { apiRequest } from "../request";
import { API_URL } from "../urls";

export const getGolfInfo = async (golf_no) => {
  try {
    const response = await apiRequest.get(API_URL.GOLF_GET(golf_no));
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getGolfByRegion = async (region) => {
  try {
    const response = await apiRequest.get(API_URL.GOLF_REGION_GET(region));
    return response.data;
  } catch (error) {
    throw error;
  }
};
