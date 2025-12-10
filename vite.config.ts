import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Config sem path e sem __dirname
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})
