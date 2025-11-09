import { defineConfig } from 'vite';
import plugin from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    //base: '/booking-website/',
    plugins: [
        plugin(),
    ],
    server: {
        port: 8080,
    },
})