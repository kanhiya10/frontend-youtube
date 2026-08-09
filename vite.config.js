import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/target':'https://backend-youtube-1-wjve.onrender.com', 
    }
  },
  plugins: [react()],
}) 
