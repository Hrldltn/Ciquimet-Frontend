import axios from 'axios';

<<<<<<< HEAD
const baseURL = process.env.baseURL;

=======
const baseURL = import.meta.env.BASE_URL
>>>>>>> 54ca1431af879054218c3dc0db80b938ba92f2e9

export const ConnectAxios = axios.create({
    baseURL
});


export const authAxios = axios.create({
    baseURL,
    withCredentials: true,
})
