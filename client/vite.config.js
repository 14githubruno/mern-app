import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
const __dirname = import.meta.dirname;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@/breakpoints": path.join(
        __dirname,
        "src",
        "styles",
        "variables",
        "_breakpoints.scss"
      ),
    },
  },
});
