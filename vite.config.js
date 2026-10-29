import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' = rutas relativas: el sitio funciona en cualquier carpeta del servidor
export default defineConfig({
  plugins: [react()],
  base: './',
});
