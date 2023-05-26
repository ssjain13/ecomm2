import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/ecomm2",
  plugins: [react()],
  define: {
    "process.env": {
      REACT_APP_PROD_API_URL: "https://fashionesta-app.onrender.com",
      REACT_APP_LOCAL_API_URL: "http://localhost:3100",
    },
  },
});
