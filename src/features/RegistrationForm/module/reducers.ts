import { createSlice } from '@reduxjs/toolkit';
import { IRegistrationState } from './typeFormRegistr';

interface RegistrationState {
	registration: IRegistrationState[];
	error: string;
}

const initialState: RegistrationState = {
	registration: [],
	error: '',
};

export const registrationSlice = createSlice({
	name: 'registration',
	initialState,
	reducers: {
		registrationUser(state, action) {
			state.registration.push(action.payload);
		},
	},
});

export default registrationSlice.reducer;
