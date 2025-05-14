import { IRegistrationState } from '@features/RegistrationForm/module/typeFormRegistr';
import {axiosRequest} from '@shared/lib/axiosSeting'
import axios from 'axios';

export const addUser = async (
	data: IRegistrationState,
	setSuccess: (success: boolean) => void,
	setError: (error: string) => void
) => {
	try {
		const res = await axiosRequest.post(`/auth/sign-up`, {
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
