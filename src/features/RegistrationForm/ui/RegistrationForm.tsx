import { Button } from '../../../shared/ui/Button';
import { Input } from '../../../shared/ui/Input';
import style from '../styles/RegistrationForm.module.css'
export const RegistrationForm = () => {
	return (
		<form>
			<h1>CREATE ACCOUNT</h1>
			<div className={style.form}>
				<h2>Email</h2>
				<Input Placeholder={'Email'} type={'email'} />
			</div>
			<div>
				<h2>UserName</h2>
				<Input Placeholder={'UserName'} type={'text'} />
			</div>
			<div>
				<h2>Password</h2>
				<Input Placeholder={'Password'} type={'password'} />
			</div>
			<Button />
		</form>
	);
};
