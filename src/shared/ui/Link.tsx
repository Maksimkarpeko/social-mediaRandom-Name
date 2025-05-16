import { LinkType } from '@shared/lib/types';
import { FC } from 'react';
import style from '../styles/ui/links.module.css';
export const Link: FC<LinkType> = ({ img, text, width, onClick,isActive }) => {
	return (
		<div className={style.container}>
			<div
				onClick={() => {
					if (onClick && text) {
						onClick(text);
					}
				}}
				className={`${style.iconWrapper} ${isActive ? style.active : ''}`}
			>
				<img src={img} alt='Pictures' width={width} />
			</div>
		</div>
	);
};
