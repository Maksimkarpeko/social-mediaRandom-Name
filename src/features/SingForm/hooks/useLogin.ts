import { useForm } from 'react-hook-form';
import { ILogin } from '../module/typeLogin';


export const useLoginForm = () => {
	return useForm<ILogin>({
		mode: 'onChange',
	});
};