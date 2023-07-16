import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import mkcert from "vite-plugin-mkcert";
import path from "path";
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // eslint(),
    react(),
    // , mkcert()
  ],
  resolve: {
    alias: {
      "@thor": path.resolve(__dirname, "./src/"),
    },
  },
  // server: {
  //   https: true,
  // },
});
