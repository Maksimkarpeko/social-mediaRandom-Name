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
		targgetLike(state,action){
			const post = state.posts.find(post => post.id === action.payload.id)
			if (post){
				post.isLiked = action.payload.isLiked
				post._count.like += action.payload.isLiked ? 1 : -1
			}
		},
		// targetComment(state,action){
		// 	const post = state.posts.find(post => post.id === action.payload.id);
		// },
		clearReducer(state){
			state.posts = []
		}
	},
});
export default postSlice.reducer;
