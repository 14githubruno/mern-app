import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
const __dirname = import.meta.dirname;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@/fonts": path.join(
        __dirname,
        "public",
        "fonts",
        "Inter"
      ),
      "@/breakpoints": path.join(
        __dirname,
        "src",
        "styles",
        "@use",
        "_breakpoints.scss"
      ),
      "@/z-index": path.join(
        __dirname,
        "src",
        "styles",
        "@use",
        "_z-index.scss"
      ),
      "@/mixins": path.join(
        __dirname, 
        "src",
        "styles",
        "@use", 
        "_mixins.scss"
      ),
    },
  },
});
