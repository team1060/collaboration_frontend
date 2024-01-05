import axios from "axios";

const baseURL = 'http://localhost:8081/api';
const ACCESS_TOKEN = localStorage.getItem('ACCESS_TOKEN')


const axiosAuth = axios.create({
    baseURL,
    headers: {
        'Content-Type' : 'application/json',
        'Authorization' : ACCESS_TOKEN ? `Bearer ${ACCESS_TOKEN}`:''
    }
})

export default axiosAuth;