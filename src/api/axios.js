import axios from 'axios';
const BASE_URL = 'https://kbase-backend-b5135e83fa8d.herokuapp.com';

axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'https://kbase-backend-b5135e83fa8d.herokuapp.com';
axios.defaults.headers.common['Access-Control-Allow-Credentials'] = 'true';

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});