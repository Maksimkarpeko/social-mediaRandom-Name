import { axiosRequest } from '@shared/lib/axiosSeting';
import { AppDispatch } from '@providers/store/store';
import { userSlice } from '../module/reducer';

export const GetUsers = (
	setUserImg: (img: string) => void,
	setUserName: (name: string) => void
) => {
	return async (dispatch: AppDispatch) => {
		const res = await axiosRequest.get('/users/me', {});
		try {
			const userName = res.data.username;
			const userImg = res.data.image;
			setUserImg(userImg);
			setUserName(userName);
			dispatch(userSlice.actions.getUsers({
				name:userName,
				img:userImg,
			}))
		} catch (error) {
			console.log(error);
		}
	};
};
