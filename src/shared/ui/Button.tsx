import classNames from 'classnames';
import { FC } from 'react';
import { ButtonType } from '../lib/types';
import style from '../styles/ui/button.module.css';
export const Button: FC<ButtonType> = ({ text, anotherСlass, onClick }) => {
	return (
		<>
			<button
				className={classNames(style.button, anotherСlass)}
				onClick={onClick}
			>
				{text}
			</button>
		</>
	);
};
