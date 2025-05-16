import { ILogin } from '@features/SingForm/module/typeLogin';
import { useForm } from 'react-hook-form';

export const useLoginForm = () => {
	return useForm<ILogin>({
		mode: 'onSubmit',
		reValidateMode: 'onSubmit',
	});
};
