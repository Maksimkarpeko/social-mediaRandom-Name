import {
	EyeInvisibleOutlined,
	EyeTwoTone,
	LeftOutlined,
} from '@ant-design/icons';
import { singIn } from '@login/api/request';
import { useLoginForm } from '@login/hooks/useLogin';
import { ILogin } from '@login/module/typeLogin';
import style from '@login/style/SingForm.module.css';
import { Links } from '@shared/lib/enumForLink';
import { Button } from '@shared/ui/Button';
import { ErrorMessage } from '@shared/ui/ErrorMessage';
import { Input } from 'antd';
import { useState } from 'react';
import { Controller, SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';
export const SingForm = () => {
	const [error, setError] = useState<string>('');
	const [success, setSuccess] = useState<boolean>(false);
	const { control, handleSubmit } = useLoginForm();

	const onSubmit: SubmitHandler<ILogin> = (data: ILogin) => {
		singIn(data, setSuccess, setError);
	};

	return (
		<div className={style.div}>
			<form onSubmit={handleSubmit(onSubmit)} className={style.formSing}>
				<Link to={Links.startPage} className={style.backToStartPage}>
					<LeftOutlined />
				</Link>
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
