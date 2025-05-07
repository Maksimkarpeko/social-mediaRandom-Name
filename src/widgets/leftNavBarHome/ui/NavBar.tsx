import bell from '@shared/assets/Bell_red.png';
import create from '@shared/assets/Create_red.png';
import home from '@shared/assets/House_red.png';
import moon from '@shared/assets/Moon.png';
import search from '@shared/assets/Search_Red.png';
import logo from '@shared/assets/logo.png';
import profile from '@shared/assets/profile_red.png';
import { Link } from '@shared/ui/Link';
import { FC } from 'react';
import style from '../style/lNavBar.module.css';
interface props {
	onNavigate: (type: string) => void;
}
export const LeftNavBar: FC<props> = ({ onNavigate }) => {
	return (
		<>
			<div className={style.container}>
				<div className={style.logo}>
					<img src={logo} alt='logo' width={'50px'} />
				</div>
				<Link text='home' img={home} width={'25px'} onClick={onNavigate} />
				<Link text='search' img={search} width={'25px'} onClick={onNavigate} />
				<Link text='create' img={create} width={'25px'} onClick={onNavigate} />
				<Link text='bell' img={bell} width={'25px'} onClick={onNavigate} />
				<Link
					text='profile'
					img={profile}
					width={'25px'}
					onClick={onNavigate}
				/>
				<img src={moon} alt='moon' width={'25px'} />
			</div>
		</>
	);
};
