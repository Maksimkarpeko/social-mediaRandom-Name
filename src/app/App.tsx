import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RegistrationPage } from '../page/RegistrationPage/RegistrationPage';
import { SingIn } from '../page/SingIn/SingIn';
import './GlobalStyle.css';
import { Provider } from 'react-redux';
import { setupStore } from '../providers/store/store';
import { StartPage } from "../page/StartPage/StartPage";
const router = createBrowserRouter([
	{path:"/",element:<StartPage />},
	{ path: '/Registration', element: <RegistrationPage /> },
	{ path: '/SingInUser', element: <SingIn /> },
]);

export const store = setupStore();

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</StrictMode>
);
