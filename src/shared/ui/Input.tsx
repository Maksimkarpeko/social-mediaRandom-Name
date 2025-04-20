import { FC } from 'react';
import { InputType } from '../types/types';
export const Input: FC<InputType> = ({ Placeholder, type }) => {
	return (
		<>
			<input type={type} placeholder={Placeholder} />
		</>
	);
};
