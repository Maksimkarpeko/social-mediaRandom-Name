import { CommentOutlined, HeartFilled, HeartOutlined } from '@ant-design/icons';
import { postSlice } from '@features/posts/module/reduce';
import { useAppDispatch } from '@providers/store/hooks';
import { CardType } from '@shared/lib/types';
import style from '@shared/styles/ui/card.module.css';
import { useState } from 'react';
import { ModalPost } from './ModalPost';
export const CardPost = ({
	userImg,
	userName,
	data,
	content,
	postImg,
	postLike,
	postComments,
	isLiked,
	postId,
	getLike,
	deleteLike,
}: CardType) => {
	const dispatch = useAppDispatch();
	const [isLike, setIsLike] = useState<boolean>(isLiked || false);
	const [count, setCount] = useState<number>(postLike);
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const handleLike = async () => {
		setIsLike(true);
		setCount(prev => prev + 1);
		dispatch(postSlice.actions.targgetLike({ isLike, postId }));
		await getLike();
	};
	const handleUnLike = async () => {
		setIsLike(false);
		setCount(prev => prev - 1);
		dispatch(postSlice.actions.targgetLike({ isLike, postId }));
		await deleteLike();
	};

	return (
		<>
			<div className={style.container}>
				<div className={style.user_bar}>
					<img src={userImg} alt='userImg' width={'6%'} />
					<span className={style.user_name}>{userName}</span>
					<span className={style.user_data}>{data}</span>
				</div>
				<div className={style.post_main}>
					<p className={style.post_main__content}>{content}</p>
					<img src={postImg} alt='' width={'100%'} />
				</div>
				<div className={style.post_footer}>
					<div className={style.post_Like}>
						{isLike ? (
							<HeartFilled
								className={style.filledLike}
								onClick={handleUnLike}
							/>
						) : (
							<HeartOutlined className={style.Like} onClick={handleLike} />
						)}
						<span className={style.span}>{count}</span>
					</div>
					<div className={style.post_comments}>
						<CommentOutlined
							className={style.comments}
							onClick={() => {
								setModalOpen(true);
							}}
						/>
						<span className={style.span}>{postComments}</span>
					</div>
				</div>
			</div>
			{modalOpen && (
				<>
					<ModalPost userImg={userImg} userName={userName} content={content} postImg={postImg} isLike={isLike} handleLike={handleLike} handleUnLike={handleUnLike} count={count} setModuleOpen={setModalOpen}/>
				</>
			)}
			<hr className={style.hr} />
		</>
	);
};
