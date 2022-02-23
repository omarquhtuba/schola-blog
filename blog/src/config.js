import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL = "https://scholarships-blog.herokuapp.com/api/"
})