import { CommentOutlined, HeartFilled, HeartOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { ModalPost } from 'src/features/ModalPost/ui/ModalPost';
import { useCardPost } from '../hooks/useCardPost';
import { CardType } from '../lib/type';
import style from '../style/card.module.css';
export const CardPost = ({
	userImg,
	userName,
	data,
	content,
	postImg,
	postCommentsCount,
	isLiked,
	postLike,
	postId,
	getLike,
	deleteLike,
	getComment,
}: CardType) => {
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const { isLike, count, handleLike, handleUnLike, onClickComments } =
		useCardPost({
			isLiked,
			postLike,
			getLike,
			deleteLike,
			getComment,
			postId,
			count: postLike,
			setModalOpen,
		});
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
							onClick={onClickComments}
						/>
						<span className={style.span}>{postCommentsCount}</span>
					</div>
				</div>
			</div>
			{modalOpen && (
				<>
					<ModalPost
						userImg={userImg}
						userName={userName}
						content={content}
						postImg={postImg}
						isLike={isLike}
						handleLike={handleLike}
						handleUnLike={handleUnLike}
						count={count}
						setModuleOpen={setModalOpen}
						postId={postId}
					/>
				</>
			)}
			<hr className={style.hr} />
		</>
	);
};
