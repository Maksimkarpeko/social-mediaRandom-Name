import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { IRegistration } from '../type/typeFormRegistr';

import {
	EyeInvisibleOutlined,
	EyeTwoTone,
	UserOutlined,
} from '@ant-design/icons';
import { Input } from 'antd';
import { Link } from 'react-router-dom';
import { Button } from '../../../shared/ui/Button';
import style from '../styles/RegistrationForm.module.css';
import { ErrorMessage } from '../../../shared/ui/ErrorMessage';

export const RegistrationForm = () => {
	const { control, handleSubmit } = useForm<IRegistration>({
		mode: 'onChange',
	});
	const onSubmit: SubmitHandler<IRegistration> = data => {
		console.log(data);
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
								className={style.InputUserName}
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
							value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{6,}$/,
							message:
								'Min 6 chars, 1 uppercase, 1 lowercase, 1 number',
						},
					}}
					render={({ field, fieldState }) => (
						<>
							<Input.Password
								className={style.InputPassword}
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
				<Link to={'/SingInUser'} className={style.Link}>
					Sing In
				</Link>
			</p>
		</form>
	);
};
