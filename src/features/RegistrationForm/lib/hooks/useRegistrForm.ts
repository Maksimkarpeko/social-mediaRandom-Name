import { useForm } from 'react-hook-form';
import { IRegistration } from '@RegistrationType';

export const useRegistrForm = () => {
	return useForm<IRegistration>({
		mode: 'onChange',
	});
};


