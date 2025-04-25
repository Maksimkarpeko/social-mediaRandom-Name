import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Input } from 'antd';
import { Controller, SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Button } from '../../../shared/ui/Button';
import { ErrorMessage } from '../../../shared/ui/ErrorMessage';
import style from '../../RegistrationForm/styles/RegistrationForm.module.css';
import { useLoginForm } from '../hooks/useLogin';
import { ILogin } from '../module/typeLogin';
import { singIn } from '../api/request';
import { useState } from 'react';

export const SingForm = () => {
	const [error,setError] = useState<string>('');
	const [success,setSuccess] = useState<boolean>(false);
	const { control, handleSubmit } = useLoginForm();

	const onSubmit: SubmitHandler<ILogin> = data => {
		singIn(data,setSuccess,setError);
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
									className={style.InputEmail}
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
									className={style.InputPassword}
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
					<Link to={'/'} className={style.Link}>
						Register
					</Link>
				</p>
				{error && <p>{error}</p>}
				{success && <p>successful login</p>}
			</form>
		</>
	);
};
