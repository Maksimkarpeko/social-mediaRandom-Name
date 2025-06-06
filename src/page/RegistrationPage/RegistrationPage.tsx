import { RegistrationForm } from '@features/RegistrationForm/index';
import { ConfigProvider } from 'antd';
export function RegistrationPage() {
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
			<RegistrationForm />
		</ConfigProvider>
	);
}
