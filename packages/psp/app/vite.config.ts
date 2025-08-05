import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import svgLoader from 'vite-svg-loader'

export default defineConfig({
  resolve: {
    alias: {
      '@': '/src',
    },
  },

  esbuild: {
    legalComments: 'none',
  },

  plugins: [
    vue(),
    svgLoader(),
    Components(),
    AutoImport({
      imports: ['vue', 'vue-router', 'vue-i18n'],
    }),
    VueI18nPlugin({
      include: ['src/locales/**/*.json'],
      dropMessageCompiler: true,
    }),
    tailwindcss(),
  ],

  server: {
    proxy: {
      '/graphql': 'http://localhost:4000',
    },
  },
})
