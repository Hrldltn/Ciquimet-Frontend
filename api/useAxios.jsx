import axios from 'axios';

const baseURL = import.meta.env.BASE_URL

export const ConnectAxios = axios.create({
    baseURL
});


export const authAxios = axios.create({
    baseURL,
    withCredentials: true,
})
