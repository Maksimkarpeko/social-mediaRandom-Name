import {
	EyeInvisibleOutlined,
	EyeTwoTone,
	LeftOutlined,
	LockOutlined,
	MailOutlined,
} from '@ant-design/icons';
import { singIn } from '@features/SingForm/api/request';
import { useLoginForm } from '@features/SingForm/hooks/useLogin';
import { ILogin } from '@features/SingForm/module/typeLogin';
import style from '@features/SingForm/style/singForm.module.css';
import { Links } from '@shared/lib/enumForLink';
import { Button } from '@shared/ui/Button';
import { ErrorMessage } from '@shared/ui/ErrorMessage';
import { Input } from 'antd';
import { useState } from 'react';
import { Controller, SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
export const SingForm = () => {
	const [error, setError] = useState<string>('');
	const [success, setSuccess] = useState<boolean>(false);
	const { control, handleSubmit } = useLoginForm();
	const navigate = useNavigate();
	const onSubmit: SubmitHandler<ILogin> = (data: ILogin) => {
		singIn(data, navigate, setSuccess, setError);
	};
	return (
		<div className={style.div}>
			<form onSubmit={handleSubmit(onSubmit)} className={style.formSing}>
				<Link to={Links.startPage} className={style.backToStartPage}>
					<LeftOutlined />
					back
				</Link>
				<h1>Login on account</h1>
				<div>
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
									prefix={<MailOutlined />}
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
						rules={{ required: 'Password is required' }}
						render={({ field, fieldState }) => (
							<>
								<Input.Password
									className={style.InputPassword}
									placeholder='password'
									prefix={<LockOutlined />}
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
				<Button text='Continue' />
				<span>
					You do not have an account yet?{' '}
					<Link to={Links.registration} className={style.link}>
						Register
					</Link>
				</span>
				{error && <p className={style.error}>{error}</p>}
				{success && <p>successful login</p>}
			</form>
		</div>
	);
};
