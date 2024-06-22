import axios from 'axios';
const BASE_URL = 'http://localhost:8080';

axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:8080';
axios.defaults.headers.common['Access-Control-Allow-Credentials'] = 'true';

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});