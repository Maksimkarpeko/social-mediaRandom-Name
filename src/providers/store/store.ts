import { combineReducers, configureStore } from '@reduxjs/toolkit';
import registrationReducer from '../../features/RegistrationForm/module/reducers';
import userReducer from "../../entities/user/module/reducer"
import  postReduce from '../../features/posts/module/reduce';
const rootReducer = combineReducers({
	registrationReducer,
	userReducer,
	postReduce
});

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
	});
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
