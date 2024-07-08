import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,  // Puedes cambiar a true si necesitas sourcemaps en producción
  },
  server: {
    host: '0.0.0.0',  // Permite que el servidor escuche en todas las interfaces
    port: process.env.PORT || 5173,  // Usa el puerto de la variable de entorno PORT si está disponible, de lo contrario, usa el puerto 5173
  },
});
