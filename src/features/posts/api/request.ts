import { axiosRequest } from '@shared/lib/axiosSeting';
import { AppDispatch } from '@providers/store/store';
import { postSlice } from '../module/reduce';
import { IPosts } from '../lib/types';

export const getPost = () => {
	return async (dispatch: AppDispatch) => {
		try {
			const res = await axiosRequest.get('posts');
			const post = res.data.map((item: IPosts) => ({
				id: item.id,
				content: item.content,
				image: item.image,
				isEditable: item.isEditable,
				isLiked: item.isLiked,
				updatedAt: item.updatedAt,
				user: {
					username: item.user.username,
					image: item.user.image,
				},
				_count: {
					comments: item._count?.comments ?? 0,
					like: item._count?.likes ?? 0,
				},
			}));
			dispatch(postSlice.actions.getPost(post));
		} catch (error) {
			console.log(error);
		}
	};
};

export const getLike = async (postId: number) => {
	try {
		const res = await axiosRequest.post(`likes/${postId}`);
		console.log(res);
	} catch (e) {
		console.log(e);
	}
};

export const deleteLike = async (postId: number) => {
	try {
		const res = await axiosRequest.delete(`likes/${postId}`);
		console.log(res);
	} catch (e) {
		console.log(e);
	}
};
export const postComments = async (content:string,postId:number | undefined) => {
	try {
		const res = await axiosRequest.post('comments',{
			content,
			postId,
		});
		console.log(res.data);
	} catch (e) {
		console.log(e);
	}
};
export const getComments = async (postId:number | undefined) => {
	try {
		const res = await axiosRequest.get('comments', {
			params: {
				postId,
			},
		});
		console.log(res);
	} catch (e) {
		console.log(e);
	}
};
