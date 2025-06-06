import { createSlice } from '@reduxjs/toolkit';
import { ICommentsState, IPostState } from '../lib/types';

const initialState: IPostState & ICommentsState = {
	posts: [],
	comments:[],
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
		getComments(state,action) {
			state.comments = action.payload
		},
		clearReducer(state){
			state.posts = []
		}
	},
});
export default postSlice.reducer;
