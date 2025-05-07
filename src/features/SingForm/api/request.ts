import { ILogin } from '@login/module/typeLogin';
import { axiosRequest } from '@shared/lib/axiosSeting';
import axios from 'axios';
export const singIn = async (
	data: ILogin,
	navigate: (path:string) => void,
	setSuccess: (success: boolean) => void,
	setError: (error: string) => void
) => {
	try {
		const res = await axiosRequest.post(`/auth/sign-in`, {
			email: data.email,
			password: data.password,
		});
		if (res.status == 200) {
			localStorage.setItem('token', res.data.access_token);
			setSuccess(true);
			setError('');
			navigate("/home");
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
