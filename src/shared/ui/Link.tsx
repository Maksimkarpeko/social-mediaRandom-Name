import { LinkType } from '@shared/lib/types';
import { FC } from 'react';
import style from '../styles/ui/links.module.css';
export const Link: FC<LinkType> = ({ img, text, width }) => {
	return (
		<div className={style.container}>
			<div>
				<img src={img} alt='Pictures' width={width}/>
			</div>
			<span>{text}</span>
		</div>
	);
};
