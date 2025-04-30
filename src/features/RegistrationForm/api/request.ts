import { IRegistrationState } from '@registration/module/typeFormRegistr';
import axios from 'axios';

const MY_BACKEND_LINK = 'http://localhost:8000';

export const addUser = async (
	data: IRegistrationState,
	setSuccess: (success: boolean) => void,
	setError: (error: string) => void
) => {
	try {
		const res = await axios.post(`${MY_BACKEND_LINK}/auth/sign-up`, {
			email: data.email,
			username: data.userName,
			password: data.password,
		});
		if (res.status == 201) {
			setSuccess(true);
			setError('');
		}
	} catch (err: unknown) {
		if (axios.isAxiosError(err) && err.response) {
			if (err.response.status === 403) {
				setSuccess(false);
				setError('User already created');
			}
		} else {
			setSuccess(false);
			setError('Something went wrong with the server.');
		}
	}
};
