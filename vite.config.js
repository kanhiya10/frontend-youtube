import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  ...(mode === 'development' && {
    server: {
      port: 8080,
      strictPort: true,
      host: true,
      proxy: {
        '/target': 'http://localhost:8000',
      },
    },
  }),
}))
