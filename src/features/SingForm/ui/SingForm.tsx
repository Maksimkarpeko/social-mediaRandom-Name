import style from '../../RegistrationForm/styles/RegistrationForm.module.css'
import { Input } from 'antd'
import {
	EyeInvisibleOutlined,
	EyeTwoTone,
	UserOutlined,
} from '@ant-design/icons'
import { Button } from '../../../shared/ui/Button'
import { Link } from 'react-router-dom'
export const SingForm = () => {
	return (
		<>
			<form action="">
				<h1>LOGIN TO ACCOUNT</h1>
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
				You do not have an account yet? <Link to={'/'} className={style.Link}>Register</Link>
			</p>
			</form>
		</>
	)
}