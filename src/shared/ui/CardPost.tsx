import { CommentOutlined, HeartOutlined,HeartFilled } from '@ant-design/icons';
import { CardType } from '@shared/lib/types';
import style from '@shared/styles/ui/card.module.css';
export const CardPost = ({
	userImg,
	userName,
	data,
	content,
	postImg,
	postLike,
	postComments,
	isLiked,
}: CardType) => {
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
						{isLiked ? <HeartFilled className={style.filledLike} /> : <HeartOutlined className={style.Like} />}
						<span className={style.span}>{postLike}</span>
					</div>
					<div className={style.post_comments}>
						<CommentOutlined className={style.comments} />
						<span className={style.span}>{postComments}</span>
					</div>
				</div>
			</div>

			<hr className={style.hr} />
		</>
	);
};
