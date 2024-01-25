import axios from "axios";

const baseURL = `${process.env.REACT_APP_BASE_URL}/api`;
const axiosInstance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    }
});

export default axiosInstance;