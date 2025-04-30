import axios from 'axios';
const MY_BACKEND_LINK = 'http://localhost:8000';
export const axiosRequest = axios.create({
	baseURL:MY_BACKEND_LINK,
})