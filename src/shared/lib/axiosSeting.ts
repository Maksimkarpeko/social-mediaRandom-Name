import axios, { InternalAxiosRequestConfig } from 'axios';
const MY_BACKEND_LINK = 'http://localhost:8000';
export const axiosRequest = axios.create({
	baseURL: MY_BACKEND_LINK,
});

axiosRequest.interceptors.request.use((config: InternalAxiosRequestConfig) => {
	config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
	return config;
});
