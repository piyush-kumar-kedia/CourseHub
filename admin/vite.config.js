import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { API_BASE_URL } from "./src/apis";

// https://vite.dev/config/
export default defineConfig({
    base: "/admin/",
    plugins: [react(), tailwindcss()],
    server: {
        port: 5174,
        proxy: {
            "/api": API_BASE_URL,
        },
    },
});
