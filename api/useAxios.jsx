import axios from 'axios';

const baseURL = import.meta.env.baseURL

export const ConnectAxios = axios.create({
    baseURL
});


export const authAxios = axios.create({
    baseURL,
    withCredentials: true,
})
