import { defineConfig } from 'vite';
import plugin from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    //base: "/booking-website/", // <-- for github pages only
    plugins: [
        plugin(),
    ],
    server: {
        port: 8080,
    },
})