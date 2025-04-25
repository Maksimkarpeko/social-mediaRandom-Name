import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainPage } from '../page/MainPage/MainPage';
import { SingIn } from '../page/SingIn/SingIn';
import './GlobalStyle.css';
import { Provider } from 'react-redux';
import { setupStore } from '../providers/store/store';
const router = createBrowserRouter([
	{ path: '/', element: <MainPage /> },
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
