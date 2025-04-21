import style from '../styles/RegistrationForm.module.css';
import { useState } from 'react';
import { Input} from 'antd';
import { Button } from '../../../shared/ui/Button';
import { Link } from 'react-router-dom';
import {
	EyeInvisibleOutlined,
	EyeTwoTone,
	UserOutlined,
} from '@ant-design/icons';
export const RegistrationForm = () => {
	return (
		<form>
			<h1>CREATE ACCOUNT</h1>
			<div className={style.form}>
				<h2>Email</h2>
				<Input placeholder='Email' className={style.InputEmail} />
			</div>
			<div>
				<h2>UserName</h2>
				<Input placeholder='UserName' prefix={<UserOutlined />} />
			</div>
			<div>
				<h2>Password</h2>
				<Input.Password
					placeholder='password'
					iconRender={visible =>
						visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
					}
				/>
			</div>
			<Button />
			<p>
				Already have an account? <Link to={'/SingInUser'} className={style.Link}>Sing In</Link>
			</p>
		</form>
	);
};
