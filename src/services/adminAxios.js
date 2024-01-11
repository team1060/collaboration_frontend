import axios from "axios";

const baseURL = 'http://localhost:8081/api'
const axiosAdmin = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    }
});

export default axiosAdmin;