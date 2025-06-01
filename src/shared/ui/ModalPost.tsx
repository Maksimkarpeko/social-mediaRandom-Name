import {
	CloseOutlined,
	CommentOutlined,
	HeartFilled,
	HeartOutlined,
} from '@ant-design/icons';
import { ModalType } from '@shared/lib/types';
import style from '@shared/styles/ui/modalPost.module.css';
import { Comments } from './Comments';
import { ChangeEvent, useState } from 'react';
import { postComments } from 'src/features/posts/api/request';
export const ModalPost = ({
	postId,
	userImg,
	userName,
	content,
	postImg,
	isLike,
	handleUnLike,
	handleLike,
	count,
	setModuleOpen,
}: ModalType) => {
	const [fieldInput, setFieldInput] = useState<string>('');
	const closeModel = () => {
		setModuleOpen(false);
	};
	const handChange = (event:ChangeEvent<HTMLInputElement>) => {
		setFieldInput(event.target.value);
	}
	const createComments = () => {
		postComments(fieldInput,postId);
		console.log("Комментарий создан");
	}
	return (
		<>
			<div className={style.modal_backdrop}>
				<div className={style.modal}>
					<div className={style.modalImgContent}>
						<img src={postImg} alt='ImgForPost' width={'100%'} />
					</div>
					<div className={style.modalContent}>
						<div className={style.modalUser}>
							<div className={style.modalUserName}>
								<div className={style.modalContainerImgUser}>
									<img src={userImg} alt='User' width={'100%'} />
								</div>
								<div>
									<h2>{userName}</h2>
								</div>
							</div>
							<div className={style.closeCross}>
								<CloseOutlined onClick={closeModel} />
							</div>
						</div>

						<hr />
						<div>
							<div className={style.modalComment}>
								<div className={style.modalCommentName}>
									<div className={style.modalContainerImgCommentUser}>
										<img src={userImg} alt='User' width={'80%'} />
									</div>
									<div>
										<h2>{userName}</h2>
									</div>
									<div className={style.modalCommentContent}>
										<span>{content}</span>
									</div>
								</div>
								<Comments />
							</div>
						</div>
						<hr />
						<div className={style.reactions}>
							<div className={style.containerLike}>
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
							<div className={style.containerComments}>
								<CommentOutlined className={style.Comments} />
							</div>
						</div>
						<hr />
						<div>
							<input type='text' onChange={handChange}  value={fieldInput}/>
							<button onClick={createComments}>Опубликовать</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
