import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";

export default defineConfig({
    server: {
        cors: {
            origin: "http://127.0.0.1:8000", // Alamat backend Laravel Anda
            methods: ["GET", "POST", "PUT", "DELETE"],
            allowedHeaders: ["Content-Type", "Authorization"],
        },
    },
    plugins: [
        laravel({
            input: "resources/js/app.tsx",
            refresh: true,
        }),
        react(),
    ],
});
