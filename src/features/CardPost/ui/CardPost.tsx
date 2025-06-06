import { CommentOutlined, HeartFilled, HeartOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { ModalPost } from 'src/features/ModalPost/ui/ModalPost';
import { useCardPost } from '../hooks/useCardPost';
import { CardType } from '../lib/type';
import style from '../style/card.module.css';
export const CardPost = ({
	post,
	getLike,
	deleteLike,
	getComment,
}: CardType) => {
	const { id, content, isLiked, image, user, _count } = post;
	const like = _count.like;
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const { isLike, count, handleLike, handleUnLike, onClickComments } =
		useCardPost({
			isLiked,
			like,
			getLike,
			deleteLike,
			getComment,
			id,
			count: like,
			setModalOpen,
		});
	return (
		<>
			<div className={style.container}>
				<div className={style.user_bar}>
					<img src={user.image} alt='userImg' width={'6%'} />
					<span className={style.user_name}>{user.username}</span>
					<span className={style.user_data}></span>
				</div>
				<div className={style.post_main}>
					<p className={style.post_main__content}>{content}</p>
					<img src={image} alt='image' width={'100%'} />
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
						<span className={style.span}>{_count.comments}</span>
					</div>
				</div>
			</div>
			{modalOpen && (
				<>
					<ModalPost
						userImg={user.image}
						userName={user.username}
						content={content}
						postImg={image}
						isLike={isLike}
						count={count}
						handleLike={handleLike}
						handleUnLike={handleUnLike}
						setModuleOpen={setModalOpen}
						postId={id}
					/>
				</>
			)}
			<hr className={style.hr} />
		</>
	);
};
