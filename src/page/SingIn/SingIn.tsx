import { SingForm } from '@features/SingForm/index';
import { ConfigProvider } from 'antd';
export const SingIn = () => {
	return (
		<ConfigProvider
			theme={{
				components: {
					Input: {
						colorBgContainer: 'transparent',
						colorPrimaryHover: 'none',
						colorPrimary: 'none',
						colorBorder: 'none',
						colorText: 'none',
						boxShadow: '0 0 0 2px rgba(24, 144, 255, 0.2)',
					},
				},
			}}
		>
			<SingForm />
		</ConfigProvider>
	);
};
