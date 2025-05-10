import { LeftNavBar } from '@leftNavBarHome/index';
import { useState } from 'react';
import { HomePage } from '../../widgets/Home/index';
import { Search } from '../../widgets/search/index';
import { Create } from '../../widgets/Create/index';
import { Notifications } from '../../widgets/Notifications/index';
import { RNavBar } from '../../widgets/rigthNavBar/index';
import { Profile } from '../../widgets/Profile/index';
import style from './style/mainPage.module.css'
export const MainPage = () => {
	const [current, setCurrent] = useState<string>('');
	return (
		<div className={style.container}>
			<LeftNavBar onNavigate={setCurrent} Current={current}/>
			{current === 'home' && <HomePage />}
			{current === 'search' && <Search />}
			{current === 'create' && <Create />}
			{current === 'bell' && <Notifications />}
			{current === 'profile' && <Profile />}
			<RNavBar />
		</div>
	);
};
