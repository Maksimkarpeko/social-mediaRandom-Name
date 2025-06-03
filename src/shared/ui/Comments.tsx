import style from '@shared/styles/ui/comments.module.css';
import { useAppSelector } from 'src/providers/store/hooks';
export const Comments = () => {
	const { comments } = useAppSelector(comment => comment.postReduce);
	return (
		<>
			{comments.map(comment => (
				<>
					<div className={style.containerComment}>
						<div className={style.containerUser}>
							<div className={style.containerUserImg}>
								<img src={comment.user.image} alt='userImg' width={'37px'} />
							</div>
							<h2>{comment.user.username}</h2>
							<div className={style.containerContent}>{comment.content}</div>
						</div>
					</div>
				</>
			))}
		</>
	);
};
