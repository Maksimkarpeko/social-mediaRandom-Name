import { Links } from '@shared/lib/enumForLink';
import { Button } from '@shared/ui/Button';
import { Link } from 'react-router-dom';
import style from "../StartPage/style/startPage.module.css"
export const StartPage = () => {
	return (
		<div className={style.div}>
			<div className={style.containerPage}>
				<h2>WELCOME TO LINKUP</h2>
				<span>Do you have account?</span>
				<Link to={Links.registration} className={style.link}>
					<Button text='Registration with email' anotherСlass={style.button} />
				</Link>
				<Link to={Links.login} className={style.link}>
					<Button text='Log in to your account' anotherСlass={style.button} />
				</Link>			

			</div>
		</div>
	);
};
