import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // sessioni e autenticazione
      '/session': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
      // utenti
      '/users': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
      // progetti di conservazione
      '/conservation-projects': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})

