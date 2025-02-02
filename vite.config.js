import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(() => ({
  base: process.env.VITE_BASE_URL || "/",
  plugins: [react()],
  define: {
    "process.env": process.env,
  },
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        main: "./index.html",
      },
    },
  },
}));
