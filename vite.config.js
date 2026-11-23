import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite configuration with JSX and React Fast Refresh support
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  }
})

