import axios from 'axios';

const baseURL = process.env.baseURL;


export const ConnectAxios = axios.create({
    baseURL
});


export const authAxios = axios.create({
    baseURL,
    withCredentials: true,
})
