import { Links } from '@shared/lib/enumForLink';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../../providers/store/hooks';
import { GetUsers } from '../api/request';
import style from '../style/user.module.css';
export const UserForNavBar = () => {
	const [userImg, setUserImg] = useState<string>('');
	const [userName, setUserName] = useState<string>('');
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(GetUsers(setUserImg, setUserName));
	}, []);

	return (
		<>
			<div className={style.container}>
				<div className={style.containerImg}>
					<img src={userImg} alt='User' width = {'100%'}className={style.img} />
				</div>
				<p className={style.span_name}>{userName}</p>
				<span className={style.span_log_out}>
					<Link to={Links.startPage}>
						Log out
					</Link>
				</span>
			</div>
		</>
	);
};
