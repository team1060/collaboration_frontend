import axios from "axios";

const baseURL = `${process.env.REACT_APP_BASE_URL}/api`;
const ACCESS_TOKEN = localStorage.getItem('ACCESS_TOKEN')


const axiosAuth = axios.create({
    baseURL,
    headers: {
        'Content-Type' : 'application/json',
        'Authorization' : ACCESS_TOKEN ? `Bearer ${ACCESS_TOKEN}`:''
    }
})

export default axiosAuth;