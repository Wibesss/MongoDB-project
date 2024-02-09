import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/": "http://localhost:5000",
      "/uploads/": "http://localhost:5000",
      "/admin": {
        target: "http://localhost:5173",
        rewrite: (path) => path.replace(/^\/admin(\/.*)?$/, "$1"),
      },
    },
  },
});
