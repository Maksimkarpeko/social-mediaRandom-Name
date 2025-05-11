import { createSlice } from '@reduxjs/toolkit';
import { IPostState } from '../lib/types';

const initialState: IPostState = {
	posts: []
};

export const postSlice = createSlice({
	name: 'post',
	initialState,
	reducers: {
		getPost(state, action) {
			state.posts = action.payload;
		},
	},
});
export default postSlice.reducer;
