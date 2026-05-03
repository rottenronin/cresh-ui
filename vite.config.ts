/// <reference types="vitest" />

import * as path from 'path'

import copy from 'rollup-plugin-copy'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'
// @ts-expect-error vite-plugin-dts 5 ships an `export =` namespace that TS sees
// as having no default, but Vite's ESM interop loads it correctly at runtime.
import dts from 'vite-plugin-dts'

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
      entryRoot: 'src',
      insertTypesEntry: true,
      outDir: 'dist',
      include: ['src'],
      exclude: ['src/**/*.stories.ts', 'src/**/*.test.ts', 'src/**/*.spec.ts', 'src/**/*.cy.ts'],
      // rollupTypes: true,
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
        loadPaths: [path.join(__dirname, 'src/styles/preprocessor')],
        additionalData: `
          @import "fonts";
          @import "break-points";
          @import "computeds";
          @import "utils";
          @import "default-colors";
        `,
        quietDeps: true,
        silenceDeprecations: ['legacy-js-api', 'import'],
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
