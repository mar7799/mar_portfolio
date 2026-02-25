import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/mar_portfolio/',        // <-- add this line
  plugins: [react()],
  assetsInclude: ['**/*.docx'],
})
