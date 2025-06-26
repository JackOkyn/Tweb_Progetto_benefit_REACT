import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/session': {
                target: 'http://localhost:8080',
                changeOrigin: true,
                secure: false,
            },
            '/users': {
                target: 'http://localhost:8080',
                changeOrigin: true,
                secure: false,
            },
            // <<< Assicurati che ci sia anche questo
            '/conservation-projects': {
                target: 'http://localhost:8080',
                changeOrigin: true,
                secure: false,
            },
        }
    }
})
/// <reference types="vite/client" />
