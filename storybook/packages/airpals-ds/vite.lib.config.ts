import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// Prepend "use client" to every output chunk so Next.js App Router
// recognises all exports as Client Components (Vite strips directives from source)
const addUseClient = (): Plugin => ({
  name: 'add-use-client',
  generateBundle(_, bundle) {
    for (const chunk of Object.values(bundle)) {
      if (chunk.type === 'chunk') {
        chunk.code = '"use client";\n' + chunk.code;
      }
    }
  },
});

export default defineConfig({
  plugins: [react(), addUseClient()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'AirpalsDS',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'cjs'}`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime', '@heroicons/react', /@heroicons\/react\/.+/],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
        },
      },
    },
    outDir: 'dist',
    sourcemap: true,
  },
  css: {
    postcss: './postcss.config.js',
  },
});
