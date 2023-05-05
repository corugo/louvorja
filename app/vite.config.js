import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  base: "./",
  server: {
    port: 5175,
    strictPort: true,
  },
  publicDir: "public",
  build: {
    assetsDir: "assets",
    assetsInlineLimit: "0",
    cssCodeSplit: false,
    sourcemap: "inline",
    minify: false,
    copyPublicDir: true,
    rollupOptions: {
      input: {
        index: "./index.html",
        control: "./control.html",
        projection: "./projection.html",
      },
    },
  },
});