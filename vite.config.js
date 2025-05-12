import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/target':process.env.VITE_API_URL, 
    }
  },
  plugins: [react()],
}) 
