import { useForm } from 'react-hook-form';
import { IRegistration } from '../../module/typeFormRegistr';

export const useRegistrForm = () => {
	return useForm<IRegistration>({
		mode: 'onChange',
	});
};


