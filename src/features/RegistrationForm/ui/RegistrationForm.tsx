import {
	EyeInvisibleOutlined,
	EyeTwoTone,
	LeftOutlined,
	UserOutlined,
	MailOutlined,
	LockOutlined
} from '@ant-design/icons';
import { addUser } from '@features/RegistrationForm/api/request';
import { useRegistrForm } from '@features/RegistrationForm/lib/hooks/useRegistrForm';
import { IRegistration } from '@features/RegistrationForm/module/typeFormRegistr';
import { Links } from '@shared/lib/enumForLink';
import { Button } from '@shared/ui/Button';
import { ErrorMessage } from '@shared/ui/ErrorMessage';
import { Input } from 'antd';
import { useState } from 'react';
import { Controller, SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';
import style from '@features/RegistrationForm/styles/registrationForm.module.css';

export const RegistrationForm = () => {
	const [error, setError] = useState<string>('');
	const [success, setSuccess] = useState<boolean>(false);
	const { control, handleSubmit } = useRegistrForm();
	const onSubmit: SubmitHandler<IRegistration> = (data: IRegistration) => {
		addUser(data, setSuccess, setError);
	};

	return (
		<div className={style.div}>
			<form onSubmit={handleSubmit(onSubmit)} className={style.formRegist}>
				<Link to={Links.startPage} className={style.backToStartPage}>
					<LeftOutlined />
					back
				</Link>
				<h1 className={style.h1}>Create your account</h1>
				<div className={style.form}>
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
									prefix={<MailOutlined />}
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
									prefix={<LockOutlined />}
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
				<Button text='Continue' />
				<span>
					Already have an account?{' '}
					<Link to={Links.login} className={style.link}>
						Sing In
					</Link>
				</span>
				{success && <p>User created</p>}
				{error && <p className={style.error}>{error}</p>}
			</form>
		</div>
	);
};
