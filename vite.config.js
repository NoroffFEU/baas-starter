import { defineConfig } from "vite";
import tailwindcss from "tailwindcss";

// https://vitejs.dev/config/
export default defineConfig({
	css: {
		postcss: {
			plugins: [tailwindcss],
		},
	},
});
