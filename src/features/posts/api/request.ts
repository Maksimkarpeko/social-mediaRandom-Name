import { axiosRequest } from '@shared/lib/axiosSeting';
import { AppDispatch } from '../../../providers/store/store';
import { postSlice } from '../module/reduce';
import { IPosts } from '../lib/types';

export const getPost = () => {
	return async (dispatch: AppDispatch) => {
		try {
			const res = await axiosRequest.get('posts');
			const post = res.data.map((item:IPosts)=>({
				content:  item.content,
				image: item.image,
				isEditable:item.isEditable,
				isLike:item.isLiked,
				user: {
					username: item.user.username,
					image: item.user.image,
				},
				counter : {
					comments: item._count?.comments ?? 0,
					like: item._count?.likes ?? 0
				}
			}))
			dispatch(postSlice.actions.getPost(post))
		} catch (error) {
			console.log(error);
		}
	};
};
