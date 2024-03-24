import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // alias para los imports
  /*resolve: {
    alias: {
      '@': Path2D.resolve(__dirname, 'src') // siempre que escriba un @ en import, se referirá a la carpeta ``src``
    }
  }*/
})
