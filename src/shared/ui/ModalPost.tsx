import {
	CloseOutlined,
	CommentOutlined,
	HeartFilled,
	HeartOutlined,
} from '@ant-design/icons';
import { ModalType } from '@shared/lib/types';
import style from '@shared/styles/ui/modalPost.module.css';
import { ChangeEvent, useState } from 'react';
import { getComments, getPost, postComments } from 'src/features/posts/api/request';
import { useAppDispatch } from 'src/providers/store/hooks';
import { Comments } from './Comments';
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
	const [isActiveInput, setIsActiveInput] = useState<boolean>(false);
	const dispatch = useAppDispatch();
	const closeModel = () => {
		setModuleOpen(false);
	};
	const handChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		setFieldInput(event.target.value);
		if (event.target.value.length > 0) {
			setIsActiveInput(true);
		} else{
			setIsActiveInput(false);
		}
	};
	const createComments = async () => {
		await postComments(fieldInput, postId);
		setFieldInput('');
		dispatch(getComments(postId));
		dispatch(getPost())
	};
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
						<div className={style.dataEntry}>
							<textarea
								onChange={handChange}
								value={fieldInput}
								className={style.textarea}
								placeholder='Add a comment...'
							/>
							<div>
								{isActiveInput ? (
									<button
										onClick={createComments}
										className={style.buttonActive}
									>
										To publish
									</button>
								) : (
									<button
										onClick={createComments}
										className={style.buttonNoneActive}
									>
										To publish
									</button>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
