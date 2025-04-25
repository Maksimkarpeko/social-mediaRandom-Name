import axios from 'axios';
import { IRegistrationState } from '../module/typeFormRegistr';

const MY_BACKEND_LINK = 'http://localhost:8000';

export const getUsers = axios.get(`${MY_BACKEND_LINK}/users/me`, {
	headers: {
		Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjI3LCJlbWFpbCI6InRlc3QxMEB0ZXN0LnRlc3QiLCJ1c2VybmFtZSI6IlRlc3QxMCIsImlhdCI6MTc0NTYxMTM0NywiZXhwIjoxNzc3MTQ3MzQ3fQ.ZVs_6jJzgQZfGQC1c5hFi6ow8lnpzH_nl_K81y1ogqM'}`,
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
