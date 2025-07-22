import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/freshcart-v1/feature-demo/", // 👈 use your repo name here
  build: {
    outDir: "dist",
  },
});
