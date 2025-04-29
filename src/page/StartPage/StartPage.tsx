import { Button } from '@UI/Button';
import { Link } from 'react-router-dom';
import style from './style/StartPage.module.css';
export const StartPage = () => {
	return (
		<>
			<div className={style.containerPage}>
				<h2>Welcome to LinkUp</h2>
				<Link to={'/Registration'} className={style.link}>
					<Button text='Registration' anotherСlass={style.button} />
				</Link>
				<Link to={'/SingInUser'} className={style.link}>
					<Button text='Login' anotherСlass={style.button} />
				</Link>
			</div>
		</>
	);
};
