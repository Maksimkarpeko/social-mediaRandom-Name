import { ILogin } from '@login/module/typeLogin';
import { useForm } from 'react-hook-form';

export const useLoginForm = () => {
	return useForm<ILogin>({
		mode: 'onChange',
	});
};
