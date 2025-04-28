import { IRegistration } from '@RegistrationType';
import { useForm } from 'react-hook-form';

export const useRegistrForm = () => {
	return useForm<IRegistration>({
		mode: 'onChange',
	});
};
