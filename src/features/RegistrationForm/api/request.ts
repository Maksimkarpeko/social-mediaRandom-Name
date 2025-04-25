import axios from 'axios';
import { IRegistrationState } from '../module/typeFormRegistr';

const MY_BACKEND_LINK = 'http://localhost:8000';



export const getUsers = axios.get(`${MY_BACKEND_LINK}/users/me`, {
	headers: {
		Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE1LCJlbWFpbCI6InRlc3Q0QHRlc3Quc2QiLCJ1c2VybmFtZSI6InRlc3Q0IiwiaWF0IjoxNzQ1MzMzMTgxLCJleHAiOjE3NzY4NjkxODF9.qZz9OFwb4SKpjskpfZf6DJh6joGcRpuNdA5kA0fklBE'}`,
	},
});
export const addUser = (
	data: IRegistrationState,
	setSuccess: (success: boolean) => void,
	setError: (error: string) => void
) => {
	axios
		.post(`${MY_BACKEND_LINK}/auth/sign-up`, {
			email: data.email,
			username: data.userName,
			password: data.password,
		})
		.then(res => {
			if (res.status == 201) {
				console.log(res.data);
				setSuccess(true);
				setError('');
			}
		})
		.catch(err => {
			if (err.response) {
				if (err.response.status === 403) {
					console.log(err);
					setSuccess(false);
					setError('User already created');
				}
			} else {
				console.log(err);
				setSuccess(false);
				setError('Something went wrong with the server.');
			}
		});
};

export const singIn = axios.post(`${MY_BACKEND_LINK}/auth/sign-in`, {
	email: 'test4@test.sd',
	password: 'test44',
});
