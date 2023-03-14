import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react()],
  define: {
    "process.env": {
      PROD_URL: "https://fashionesta-app.onrender.com"
    },
  },
});
