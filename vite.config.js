import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/target':'https://backend-youtube-zba1.onrender.com', 
    }
  },
  plugins: [react()],
}) 
