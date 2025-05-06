import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RegistrationPage } from '../page/RegistrationPage/RegistrationPage';
import { SingIn } from '../page/SingIn/SingIn';
import './GlobalStyle.css';
import { Provider } from 'react-redux';
import { setupStore } from '../providers/store/store';
import { StartPage } from "../page/StartPage/StartPage";
import {Links} from "@shared/lib/enumForLink"
import { HomePage } from '../page/HomePage/HomePage';
const router = createBrowserRouter([
	{path:Links.startPage,element:<StartPage />},
	{ path: Links.registration, element: <RegistrationPage /> },
	{ path: Links.login, element: <SingIn /> },
	{ path: Links.home, element: <HomePage />}
]);

export const store = setupStore();

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</StrictMode>
);
