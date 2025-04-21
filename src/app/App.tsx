import { StrictMode } from 'react';
import { createRoot} from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {MainPage} from '../page/MainPage/MainPage';
import './GlobalStyle.css'
import { SingIn } from '../page/SingIn/SingIn';

const router = createBrowserRouter([
	{ path: '/', element: <MainPage/> },
	{ path: '/SingInUser', element: <SingIn/>}
]);

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
);
