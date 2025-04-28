import { ILogin } from '@LoginType';
import axios from 'axios';

const MY_BACKEND_LINK = 'http://localhost:8000';

export const singIn = async (
	data: ILogin,
	setSuccess: (success: boolean) => void,
	setError: (error: string) => void
) => {
	try {
		const res = await axios.post(`${MY_BACKEND_LINK}/auth/sign-in`, {
			email: data.email,
			password: data.password,
		});
		if (res.status == 200) {
			console.log('successful login');
			setSuccess(true);
			setError('');
		}
	} catch (err: unknown) {
		if (axios.isAxiosError(err) && err.response) {
			if (err.response.status == 400) {
				console.log('Что-то пошло не так');
				setSuccess(false);
				setError('something went wrong');
			} else if (err.response.status == 401) {
				console.log('Был не найден пользователь');
				setSuccess(false);
				setError('Unauthorized');
			}
		} else {
			console.log(err);
			setSuccess(false);
			setError('Something went wrong with the server.');
		}
	}
};
