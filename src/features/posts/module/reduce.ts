import { createSlice } from '@reduxjs/toolkit';
import { IPostState } from '../lib/types';

const initialState: IPostState = {
	post: {
		content: '',
		image: '',
		user: {
			name: '',
			image: '',
		},
	},
};

export const postSlice = createSlice({
	name: 'post',
	initialState,
	reducers: {
		getPost(state, action) {
			state.post.content = action.payload.content;
			state.post.image = action.payload.image;
			state.post.user = action.payload.username;
			state.post.user = action.payload.image;
		},
	},
});
export default postSlice.reducer;
