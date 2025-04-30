import { Button } from '@shared/ui/Button';
import { Link } from 'react-router-dom';
import style from './style/StartPage.module.css';
import {Links} from '@shared/lib/enumForLink';
export const StartPage = () => {
	return (
		<>
			<div className={style.containerPage}>
				<h2>Welcome to LinkUp</h2>
				<Link to={Links[1]} className={style.link}>
					<Button text='Registration' anotherСlass={style.button} />
				</Link>
				<Link to={Links[2]} className={style.link}>
					<Button text='Login' anotherСlass={style.button} />
				</Link>
			</div>
		</>
	);
};
