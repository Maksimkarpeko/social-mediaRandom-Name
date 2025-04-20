import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {MainPage} from '../page/MainPage/MainPage';
import './GlobalStyle.css'
createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<MainPage/>
	</StrictMode>
);
