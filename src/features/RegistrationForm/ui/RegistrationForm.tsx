import { addUser } from '@RegistrationAPI';
import { useRegistrForm } from '@RegistrationHooks';
import { IRegistration } from '@RegistrationType';
import { Button } from '@UI/Button';
import { ErrorMessage } from '@UI/ErrorMessage';
import {
	EyeInvisibleOutlined,
	EyeTwoTone,
	UserOutlined,
} from '@ant-design/icons';
import { Input } from 'antd';
import { useState } from 'react';
import { Controller, SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';
import style from '../styles/RegistrationForm.module.css';

export const RegistrationForm = () => {
	const [error, setError] = useState<string>('');
	const [success, setSuccess] = useState<boolean>(false);
	const { control, handleSubmit } = useRegistrForm();
	const onSubmit: SubmitHandler<IRegistration> = (data: IRegistration) => {
		addUser(data, setSuccess, setError);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<h1>CREATE ACCOUNT</h1>
			<div className={style.form}>
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
								type='email'
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
				<h2>UserName</h2>
				<Controller
					name='userName'
					control={control}
					rules={{
						required: 'Name is required',
						pattern: {
							value: /^.{4,}$/,
							message: 'Username must be at 4 chars',
						},
					}}
					render={({ field, fieldState }) => (
						<>
							<Input
								className={style.inputUserName}
								type='text'
								placeholder='UserName'
								prefix={<UserOutlined />}
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
					rules={{
						required: 'Password is required',
						pattern: {
							value:
								/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{6,}$/,
							message:
								'Min 6 chars, 1 uppercase, 1 lowercase, 1 number, 1 special character',
						},
					}}
					render={({ field, fieldState }) => (
						<>
							<Input.Password
								className={style.inputPassword}
								type='password'
								placeholder='password'
								iconRender={visible =>
									visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
								}
								{...field}
							/>
							{fieldState.error && (
								<ErrorMessage message={fieldState.error.message} />
							)}
						</>
					)}
				/>
			</div>
			<Button />
			<p>
				Already have an account?{' '}
				<Link to={'/SingInUser'} className={style.link}>
					Sing In
				</Link>
			</p>
			{success && <p>User created</p>}
			{error && <p className={style.error}>{error}</p>}
		</form>
	);
};
