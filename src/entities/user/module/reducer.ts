import { createSlice } from '@reduxjs/toolkit';
import { IUser } from '../lib/types';
interface IUsersState {
	Users: IUser;
}

const initialState: IUsersState = {
	Users: {
		users: {
			name: '',
			img: '',
		},
	},
};
export const userSlice = createSlice({
	name: 'Users',
	initialState,
	reducers: {
		getUsers(state, action) {
			state.Users.users.name = action.payload.name;
			state.Users.users.img = action.payload.img;
		},
	},
});

export default userSlice.reducer;
