import { FC } from 'react';
import style from '../styles/ui/ErrorMessage.module.css'
export const ErrorMessage: FC<{ message?: string }> = ({ message }) => {
	return (
		<>
			<span className={style.Error}>
				{message}
			</span>
		</>
	);
};
