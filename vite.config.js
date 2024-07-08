import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import commonjs from '@rollup/plugin-commonjs';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, 'env');
  const htmlPlugin = () => {
  return {
    resolve: {
      alias: {
        'react/jsx-runtime': 'react/jsx-runtime.js',
      },
    },
    define: {
      'process.env': process.env,
    },
    build: {
      outDir: './build',
      rollupOptions: {
        plugins: [commonjs()],
      },
      commonjsOptions: {
        exclude: [/./],
      },
    },
    publicDir: './public',
    plugins: [htmlPlugin(), react({
      babel: {
        plugins: [
          ['@babel/plugin-proposal-decorators', { legacy: true }],
          ['@babel/plugin-proposal-class-properties', { loose: false }],
          'babel-plugin-transform-typescript-metadata',
          'babel-plugin-parameter-decorator',
          ['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }],
        ]
      },
    })],
    
    server: {
      host: '0.0.0.0', // Permite que el servidor escuche en todas las interfaces
      port: process.env.PORT || 5173, // Usa el puerto de la variable de entorno PORT si está disponible, de lo contrario, usa el puerto 3000
    }
   
  };
}
});
  