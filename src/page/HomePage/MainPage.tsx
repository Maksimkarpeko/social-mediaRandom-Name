import { LeftNavBar } from '@leftNavBarHome/index';
import { useState } from 'react';
import { HomePage } from '../../widgets/Home/index';
import { Search } from '../../widgets/search/index';
import { Create } from '../../widgets/Create/index';
import { Notifications } from '../../widgets/Notifications/index';
import { RNavBar } from '../../widgets/rigthNavBar/index';
import { Profile } from '../../widgets/Profile/index';
export const MainPage = () => {
	const [current, setCurrent] = useState<string>('');
	return (
		<div style={{display:'flex'}}>
			<LeftNavBar onNavigate={setCurrent} />
			{current === 'home' && <HomePage />}
			{current === 'search' && <Search />}
			{current === 'create' && <Create />}
			{current === 'bell' && <Notifications />}
			{current === 'profile' && <Profile />}
			<RNavBar />
		</div>
	);
};
