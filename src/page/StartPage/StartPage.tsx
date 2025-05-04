import { Links } from '@shared/lib/enumForLink';
import { Button } from '@shared/ui/Button';
import { Link } from 'react-router-dom';
import style from './style/StartPage.module.css';
export const StartPage = () => {
	return (
		<>
			<div className={style.containerPage}>
				<h2>WELCOME TO LINKUP</h2>
				<Link to={Links.registration} className={style.link}>
					<Button text='Registration' anotherСlass={style.button} />
				</Link>
				<Link to={Links.login} className={style.link}>
					<Button text='Login' anotherСlass={style.button} />
				</Link>
			</div>
		</>
	);
};
