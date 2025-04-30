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
const router = createBrowserRouter([
	{path:Links[0],element:<StartPage />},
	{ path: Links[1], element: <RegistrationPage /> },
	{ path: Links[2], element: <SingIn /> },
]);

export const store = setupStore();

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</StrictMode>
);
