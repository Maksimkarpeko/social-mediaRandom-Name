import { useEffect,useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../providers/store/hooks';
import { getPost,getLike,deleteLike } from '../api/request';
import style from '../style/post.module.css';
import { CardPost } from '@shared/ui/CardPost';
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
							content={item.content}
							userImg={item.user.image}
							userName={item.user.username}
							postImg={item.image}
							postComments={item._count.comments}
							postLike={item._count.like}
							isLiked={item.isLiked}
							postId={item.id}
							getLike={()=>getLike(item.id!)}
							deleteLike = {()=>deleteLike(item.id!)}
						/>
					</div>
				);
			})}
		</>
	);
};
