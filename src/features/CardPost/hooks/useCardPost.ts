import { postSlice } from '@features/posts/module/reduce';
import { useAppDispatch } from '@providers/store/hooks';
import { useState } from 'react';
import { IUseCardPost } from '../lib/type';
export const useCardPost = ({
	isLiked,
	postLike,
	postId,
	getLike,
	deleteLike,
	getComment,
	setModalOpen,
}: IUseCardPost) => {
	const [isLike, setIsLike] = useState<boolean>(isLiked || false);
	const [count, setCount] = useState<number>(postLike);
	const dispatch = useAppDispatch();
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
	const onClickComments = () => {
		getComment();
		setModalOpen(true);
	};
	return {
		isLike,
		count,
		handleLike,
		handleUnLike,
		onClickComments,
	};
};
