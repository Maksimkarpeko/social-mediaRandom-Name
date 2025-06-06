import { useAppDispatch, useAppSelector } from '@providers/store/hooks';
import { useEffect } from 'react';
import { CardPost } from '@features/CardPost/index';
import { deleteLike, getComments, getLike, getPost } from '../api/request';
import style from '../style/post.module.css';
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
					<div className={style.container} key={item.id}>
						<CardPost
							key={item.id}
							post = {item}
							getLike={() => getLike(item.id!)}
							deleteLike={() => deleteLike(item.id!)}
							getComment={() => dispatch(getComments(item.id))}
						/>
					</div>
				);
			})}
		</>
	);
};
