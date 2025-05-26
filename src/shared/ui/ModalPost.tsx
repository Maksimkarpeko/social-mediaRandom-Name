import style from '@shared/styles/ui/modalPost.module.css';
import { CommentOutlined, HeartFilled, HeartOutlined } from '@ant-design/icons';
import { ModalType } from '@shared/lib/types';
export const ModalPost = ({
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
	return (
		<>
			<div className={style.modal_backdrop}>
				<div className={style.modal}>
					<div className={style.modalImgContent}>
						<img src={postImg} alt='ImgForPost' width={'100%'} />
					</div>
					<div>
						<div>
							<button
								onClick={() => {
									setModuleOpen(false);
								}}
							>
								Закрыть
							</button>
						</div>
						<div>
							<img src={userImg} alt='User' width={'10%'} />
							<h2>{userName}</h2>
						</div>
						<hr />
						<div>
							<div>
								<img src={userImg} alt='User' width={'5%'} />
								<h2>{userName}</h2>
								<p>{content}</p>
							</div>
						</div>
						<hr />
						<div>
							<div>
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
							<div>
								<CommentOutlined />
							</div>
						</div>
						<hr />
						<div>
							<input type='text' />
							<button>Опубликовать</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
