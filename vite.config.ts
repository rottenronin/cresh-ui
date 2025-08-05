/// <reference types="vitest" />

/* eslint-disable import/no-extraneous-dependencies */

import copy from 'rollup-plugin-copy'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import * as path from 'path'

// const resolvePath = (str: string) => path.resolve(__dirname, str)

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag: string) => tag.startsWith('ce-'),
        },
      },
    }),
    vueJsx(),
    dts({
      insertTypesEntry: true,
      outputDir: 'dist',
      include: ['src'],
      cleanVueFileName: true,
    }),
  ],
  resolve: {
    alias: {
      '@': path.join(__dirname, './src'),
    },
  },
  build: {
    lib: {
      name: 'Cresh-UI',
      entry: {
        '.': path.resolve(__dirname, 'src/index.ts'),
        ui: path.resolve(__dirname, 'src/components/ui/index.ts'),
        icons: path.resolve(__dirname, 'src/components/icons/index.ts'),
        'form-controls': path.resolve(__dirname, 'src/components/form-controls/index.ts'),
        directives: path.resolve(__dirname, 'src/directives/index.ts'),
        helpers: path.resolve(__dirname, 'src/helpers/index.ts'),
        plugins: path.resolve(__dirname, 'src/plugins/index.ts'),
      },
      fileName: (format: string, entryName: string) => `${entryName === '.'
        ? 'cresh-ui'
        : entryName}.${format}.js`,
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['vue', 'vue-router', 'vue-i18n'],
      output: {
        // Provide global variables to use in the UMD build
        // Add external deps here
        globals: {
          vue: 'Vue',
        },
      },
      plugins: [
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        copy({
          targets: [
            { src: './src/styles/ui/c-notify.scss', dest: './dist/sass' },
            { src: './src/styles/ui/c-date-picker.scss', dest: './dist/sass' },
            { src: './src/styles/preprocessor/fonts.scss', dest: './dist/sass' },
            { src: './src/styles/preprocessor/break-points.scss', dest: './dist/sass' },
            { src: './src/styles/preprocessor/computeds.scss', dest: './dist/sass' },
            { src: './src/styles/preprocessor/utils.scss', dest: './dist/sass' },
            { src: './src/styles/themes/default-theme.css', dest: './dist' },
            { src: './src/@types/cresh-ui.d.ts', dest: './dist' },
            { src: './src/@types/c-datatable.d.ts', dest: './dist' },
            { src: './src/@types/c-notify.d.ts', dest: './dist' },
          ],
          verbose: true,
          copyOnce: true,
          hook: 'writeBundle',
        }),
      ],
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "./src/styles/preprocessor/fonts.scss";
          @import "./src/styles/preprocessor/break-points.scss";
          @import "./src/styles/preprocessor/computeds.scss";
          @import "./src/styles/preprocessor/utils.scss";
          @import "./src/styles/preprocessor/default-colors.scss";
        `,
      },
    },
  },
  server: {
    host: '0.0.0.0',
    port: 8085,
  },
  define: {
    __VUE_I18N_FULL_INSTALL__: false,
    __VUE_I18N_LEGACY_API__: false,
    __INTLIFY_PROD_DEVTOOLS__: false,
  },
})
