import { IRegistration } from '@features/RegistrationForm/module/typeFormRegistr';
import { useForm } from 'react-hook-form';

export const useRegistrForm = () => {
	return useForm<IRegistration>({
		mode: 'onChange',
	});
};
