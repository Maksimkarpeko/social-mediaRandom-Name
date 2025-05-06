import bell from '@shared/assets/Bell_red.png';
import create from '@shared/assets/Create_red.png';
import home from '@shared/assets/House_red.png';
import search from '@shared/assets/Search_Red.png';
import profile from '@shared/assets/profile_red.png';
import moon from '@shared/assets/Moon.png';
import logo from '@shared/assets/logo.png';
import { Link } from '@shared/ui/Link';
import style from '../style/lNavBar.module.css';
export const LeftNavBar = () => {
	return (
		<>
			<div className={style.container}>
				<div className={style.logo}>
					<img src={logo} alt='logo' width={'50px'} />
				</div>
				<Link img={home} width={'25px'} />
				<Link img={search} width={'25px'} />
				<Link img={create} width={'25px'} />
				<Link img={bell} width={'25px'} />
				<Link img={profile} width={'25px'} />
				<img src={moon} alt='moon' width={'25px'} />
			</div>
		</>
	);
};
