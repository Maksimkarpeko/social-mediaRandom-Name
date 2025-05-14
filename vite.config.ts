import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"src":path.resolve(__dirname,"src/"),
      "@widgets":path.resolve(__dirname,"src/widgets/"),
			"@features":path.resolve(__dirname,"src/features/"),
			"@entities":path.resolve(__dirname,"src/entities/"),
			"@shared":path.resolve(__dirname,"src/shared/"),
			"@page":path.resolve(__dirname,"src/page/"),
			"@providers":path.resolve(__dirname,"src/providers/"),
    },
	},
});
