import axios from 'axios';

const baseURL = 'https://ciquimet-backend.onrender.com/api/'
console.log(baseURL);

export const ConnectAxios = axios.create({
    baseURL
});


export const authAxios = axios.create({
    baseURL,
    withCredentials: true,
})