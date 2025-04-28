import { singIn } from '@LoginAPI';
import { useLoginForm } from '@LoginHooks';
import { ILogin } from '@LoginType';
import { Button } from '@UI/Button';
import { ErrorMessage } from '@UI/ErrorMessage';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Input } from 'antd';
import { useState } from 'react';
import { Controller, SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';
import style from '../../RegistrationForm/styles/RegistrationForm.module.css';

export const SingForm = () => {
	const [error, setError] = useState<string>('');
	const [success, setSuccess] = useState<boolean>(false);
	const { control, handleSubmit } = useLoginForm();

	const onSubmit: SubmitHandler<ILogin> = (data: ILogin) => {
		singIn(data, setSuccess, setError);
	};

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<h1>LOGIN TO ACCOUNT</h1>
				<div>
					<h2>Email</h2>
					<Controller
						name='email'
						control={control}
						rules={{
							required: 'Email is required',
							pattern: {
								value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
								message: 'Please enter a valid email',
							},
						}}
						render={({ field, fieldState }) => (
							<>
								<Input
									placeholder='Email'
									className={style.inputEmail}
									{...field}
								/>
								{fieldState.error && (
									<ErrorMessage message={fieldState.error.message} />
								)}
							</>
						)}
					/>
				</div>
				<div>
					<h2>Password</h2>
					<Controller
						name='password'
						control={control}
						rules={{ required: 'Password is required' }}
						render={({ field, fieldState }) => (
							<>
								<Input.Password
									className={style.inputPassword}
									placeholder='password'
									iconRender={visible =>
										visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
									}
									{...field}
								/>
								{fieldState.error && (
									<ErrorMessage message={fieldState.error?.message} />
								)}
							</>
						)}
					/>
				</div>
				<Button />
				<p>
					You do not have an account yet?{' '}
					<Link to={'/'} className={style.link}>
						Register
					</Link>
				</p>
				{error && <p className={style.error}>{error}</p>}
				{success && <p>successful login</p>}
			</form>
		</>
	);
};
