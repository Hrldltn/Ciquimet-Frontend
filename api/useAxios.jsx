import axios from 'axios';

const baseURL = 'http://localhost:8000/api/';

export const ConnectAxios = axios.create({
    baseURL
});


export const authAxios = axios.create({
    baseURL,
    withCredentials: true,
})