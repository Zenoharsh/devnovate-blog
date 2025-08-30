// vite.config.js (AFTER)
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://devnovate-blog.onrender.com", // YOUR LIVE RENDER URL
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
