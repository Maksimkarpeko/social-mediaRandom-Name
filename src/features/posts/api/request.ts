import { axiosRequest } from '@shared/lib/axiosSeting';
import { AppDispatch } from '../../../providers/store/store';
import { postSlice } from '../module/reduce';

export const getPost = () => {
	return async (dispatch: AppDispatch) => {
		try {
			const res = await axiosRequest.get('posts');
			const constent = res.data[0].content;
			const imgContent = res.data[0].image;
			dispatch(
				postSlice.actions.getPost({
					content: constent,
					image: imgContent,
					user: {
						username: res.data[0].user.username,
						image: res.data[0].user.image,
					},
				})
			);
			console.log(res.data);
			console.log(res.data[0].user);
		} catch (error) {
			console.log(error);
		}
	};
};
