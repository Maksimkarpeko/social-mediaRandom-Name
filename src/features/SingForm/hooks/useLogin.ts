import { ILogin } from '@LoginType';
import { useForm } from 'react-hook-form';

export const useLoginForm = () => {
	return useForm<ILogin>({
		mode: 'onChange',
	});
};
