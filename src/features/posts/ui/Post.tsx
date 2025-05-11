import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../providers/store/hooks';
import { getPost } from '../api/request';
import style from '../style/post.module.css'
export const Post = () => {
	const dispatch = useAppDispatch();
	const { posts } = useAppSelector(select => select.postReduce);
	useEffect(() => {
		dispatch(getPost());
	}, []);

	return (
		<>
			{posts.map(item => {
				return (
					<div className={style.container}>
						<h2>{item.content}</h2>
						<img src={item.image} alt=""width={'50%'} />
						<h2>{item.user.username}</h2>
						<h2>{item.content}</h2>
						<img src={item.image} alt=""width={'50%'} />
						<h2>{item.user.username}</h2>
					</div>
				);
			})}
		</>
	);
};
