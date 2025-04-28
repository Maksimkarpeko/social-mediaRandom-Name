import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
      "@UI":path.resolve(__dirname,'src/shared/ui'),
      "@RegistrationType":path.resolve(__dirname,'src/features/RegistrationForm/module/typeFormRegistr.ts'),
      "@RegistrationAPI":path.resolve(__dirname,"src/features/RegistrationForm/api/request.ts"),
      "@RegistrationHooks":path.resolve(__dirname,"src/features/RegistrationForm/lib/hooks/useRegistrForm.ts"),
    },
	},
});
